// 리더보드 페이지
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import RankItem from "../components/Leaderboard/RankItem";
import {
  Top,
  TopText,
  Small,
  TopTitle,
  MyRankButton,
  List,
  ListItem,
  Container,
  Title,
  Overlay, 
  ModalBox, 
  ModalHeader, 
  CloseBtn, 
  Empty
} from "../styles/LeaderBoard.styles";
import spiderman from "../assets/임시.jpg";
import { getRanking, getMyRanking } from "../api/leaderboard";
import { getMyUserId } from "../utils/auth";

const leaderboardDummy = [
  { rank: 1, userId: 101, name: "척척학사", done: 42, profileImage: "" },
  { rank: 2, userId: 102, name: "멋쟁이사자처럼", done: 40, profileImage: "" },
  { rank: 3, userId: 103, name: "스파이더맨", done: 39, profileImage: spiderman },
  { rank: 4, userId: 2, name: "user4", done: 38, profileImage: "" },
  { rank: 5, userId: 3, name: "user5", done: 37, profileImage: "" },
  { rank: 6, userId: 106, name: "user6", done: 36, profileImage: "" },
  { rank: 7, userId: 107, name: "user7", done: 35, profileImage: "" },
  { rank: 8, userId: 108, name: "user8", done: 34, profileImage: "" },
  { rank: 9, userId: 109, name: "user9", done: 33, profileImage: "" },
  { rank: 10, userId: 110, name: "user10", done: 32, profileImage: "" },
  { rank: 11, userId: 111, name: "user11", done: 31, profileImage: "" },
  { rank: 12, userId: 112, name: "user12", done: 30, profileImage: "" },
  { rank: 13, userId: 113, name: "user13", done: 29, profileImage: "" },
  { rank: 14, userId: 114, name: "user14", done: 28, profileImage: "" },
  { rank: 15, userId: 115, name: "user15", done: 27, profileImage: "" },
  { rank: 16, userId: 116, name: "user16", done: 26, profileImage: "" },
  { rank: 17, userId: 117, name: "user17", done: 25, profileImage: "" },
  { rank: 18, userId: 1, name: "user18", done: 24, profileImage: "" },
  { rank: 19, userId: 119, name: "user19", done: 23, profileImage: "" },
  { rank: 20, userId: 120, name: "user20", done: 22, profileImage: "" },
];

function LeaderBoard() {
  const myUserId = getMyUserId();

  const [total, setTotal] = useState(leaderboardDummy.length);
  const [items, setItems] = useState(
    leaderboardDummy.map(u => ({ ...u, isMe: myUserId && u.userId === myUserId }))
  );
  const [loading, setLoading] = useState(false);

  const [showMyModal, setShowMyModal] = useState(false);
  const [myAround, setMyAround] = useState([]); // 내 주변 랭킹
  const [myRank, setMyRank] = useState(null);

  const goMyRank = async () => {
    // 리스트 안에 있으면 그냥 스크롤
    const el = document.getElementById("my-rank");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // 리스트에 없으면 API로 내 순위 따로 조회
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
        setShowMyModal(true);
      } else {
        alert("내 순위를 불러오지 못했어요.");
      }
    } catch (e) {
      console.error(e);
      alert("내 순위 조회 실패");
    }
  };

  useEffect(() => {
    let aborted = false;
    (async () => {
      try {
        setLoading(true);
        const data = await getRanking(); // { totalParticipants, top: [...] }
        if (aborted) return;

        if (data.top && data.top.length > 0) {
          setTotal(data.totalParticipants ?? data.top.length);
          setItems(data.top.map(u => ({
            rank: u.rank,
            name: u.nickname,
            done: u.completedCount,
            profileImage: u.avatarUrl || "",
            userId: u.userId,
            isMe: myUserId && u.userId === myUserId,
          })));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
    return () => { aborted = true; };
  }, []);

  return (
    <Container>
      <Title>랭킹</Title>
      <Top>
        <TopText>
          <Small>총 {total.toLocaleString()}명 참여중</Small>
          <TopTitle>TOP 100</TopTitle>
        </TopText>
        <MyRankButton onClick={goMyRank}>내 순위 보기</MyRankButton>
      </Top>
      {loading ? (
        <div >로딩 중</div>
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

      {showMyModal && (
        <Overlay onClick={() => setShowMyModal(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <CloseBtn onClick={() => setShowMyModal(false)}>✕</CloseBtn>
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
