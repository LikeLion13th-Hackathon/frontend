import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import RankItem from "../components/Leaderboard/RankItem";
import {
  Top, TopText, Small, TopTitle, MyRankButton,
  List, ListItem, Container, Title,
  Overlay, ModalBox, ModalHeader, CloseBtn, Empty
} from "../styles/LeaderBoard.styles";
import { getRanking, getMyRanking } from "../api/leaderboard";
import { getMyUserId } from "../utils/auth";
import ScreenLoader from "../components/ScreenLoader";

function LeaderBoard() {
  const myUserId = getMyUserId();

  const [total, setTotal] = useState(0);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [myAround, setMyAround] = useState([]);
  const [myRank, setMyRank] = useState(null);
  const [myRankLoading, setMyRankLoading] = useState(false);

  const goMyRank = async () => {
    // 리스트 안에 있으면 그냥 스크롤
    const el = document.getElementById("my-rank");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // 리스트에 없으면 API 호출 + 모달 열기 + 로더
    setModalOpen(true);
    setMyRankLoading(true);
    try {
      const res = await getMyRanking(myUserId);
      if (res?.myRank) {
        setMyRank(res.myRank);
        setMyAround(
          (res.around ?? []).map(u => ({
            rank: u.rank,
            name: u.nickname,
            done: u.completedCount,
            profileImage: u.avatarUrl || "",
            userId: u.userId,
            isMe: u.userId === myUserId,
          }))
        );
      } else {
        setMyAround([]);
      }
    } catch (e) {
      console.error(e);
      setMyAround([]);
    } finally {
      setMyRankLoading(false);
    }
  };

  useEffect(() => {
    let aborted = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getRanking(); // { totalParticipants, top: [...] }
        if (aborted) return;

        const top = data?.top ?? [];
        setTotal(data?.totalParticipants ?? top.length ?? 0);
        setItems(
          top.map(u => ({
            rank: u.rank,
            name: u.nickname,
            done: u.completedCount,
            profileImage: u.avatarUrl || "",
            userId: u.userId,
            isMe: myUserId && u.userId === myUserId,
          }))
        );
      } catch (e) {
        if (!aborted) {
          console.error(e);
          setError("랭킹을 불러오지 못했어요.");
          setItems([]);
        }
      } finally {
        if (!aborted) setLoading(false);
      }
    })();
    return () => { aborted = true; };
  }, [myUserId]);

  return (
    <Container>
      <ScreenLoader show={loading || myRankLoading} />

      <Title>랭킹</Title>
      <Top>
        <TopText>
          <Small>총 {total.toLocaleString()}명 참여중</Small>
          <TopTitle>TOP 100</TopTitle>
        </TopText>
        <MyRankButton onClick={goMyRank}>내 순위 보기</MyRankButton>
      </Top>

      {error ? (
        <div style={{ padding: 16 }}>{error}</div>
      ) : (
        <List>
          {items.map((item) => (
            <ListItem
              key={`${item.rank}-${item.userId}`}
              id={item.isMe ? "my-rank" : undefined}
            >
              <RankItem {...item} />
            </ListItem>
          ))}
        </List>
      )}

      <Footer />

      {modalOpen && (
        <Overlay onClick={() => setModalOpen(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <CloseBtn onClick={() => setModalOpen(false)}>✕</CloseBtn>
            </ModalHeader>

            {myAround.length === 0 ? (
              <Empty>주변 랭킹 데이터가 없어요.</Empty>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {myAround.map((it) => (
                  <li key={it.userId} style={{ marginBottom: 8 }}>
                    <RankItem {...it} />
                  </li>
                ))}
              </ul>
            )}
          </ModalBox>
        </Overlay>
      )}
    </Container>
  );
}

export default LeaderBoard;