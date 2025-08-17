// 리더보드 페이지
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
} from "../styles/LeaderBoard.styles";
import spiderman from "../assets/임시.jpg";

const leaderboardDummy = [
  {
    rank: 1,
    name: "척척학사",
    done: 42,
    profileImage: "",
  },
  {
    rank: 2,
    name: "멋쟁이사자처럼",
    done: 40,
    profileImage: "",
  },
  {
    rank: 3,
    name: "스파이더맨",
    done: 39,
    profileImage: spiderman,
    isMe: true, // 현재 사용자 표시
  },
  {
    rank: 4,
    name: "user4",
    done: 35,
    profileImage: "",
  },
  {
    rank: 5,
    name: "user5",
    done: 35,
    profileImage: "",
  },
  {
    rank: 6,
    name: "user6",
    done: 35,
    profileImage: "",
  },
  {
    rank: 7,
    name: "user7",
    done: 35,
    profileImage: "",
  },
];

function LeaderBoard() {
  const totalUsers = 1000; // 총 사용자 수 (더미 데이터)
  const goMyRank = () => {
    // TODO: 내 순위 섹션으로 스크롤 or 탭 전환
    alert("내 순위로 이동");
  };
  return (
    <Container>
      <h3 style={{ textAlign: "center" }}>랭킹</h3>
      <Top>
        <TopText>
          <Small>총 {totalUsers.toLocaleString()}명 참여중</Small>
          <TopTitle>TOP 100</TopTitle>
        </TopText>
        <MyRankButton onClick={goMyRank}>내 순위 보기</MyRankButton>
      </Top>
      <List>
        {leaderboardDummy.map((item) => (
          <ListItem key={item.rank}>
            <RankItem {...item} />
          </ListItem>
        ))}
      </List>
      <Footer />
    </Container>
  );
}

export default LeaderBoard;
