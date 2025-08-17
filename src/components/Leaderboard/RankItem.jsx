import { 
  Item,
  Rank,
  Avatar,
  Info,
  Name,
  Sub
 } from "../../styles/LeaderBoard.styles";
import defaultProfile from "../../assets/default-profile.png";


export default function RankItem({ rank, name, done, profileImage, isMe }) {
  const isTop3 = rank <= 3;

  return (
    <Item $me={isMe}>
      <Rank>
        {isTop3 ? (rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉") : rank}
      </Rank>

      <Avatar>
        <img 
          src={profileImage || defaultProfile} 
          alt={name + "의 프로필"} 
        />
      </Avatar>

      <Info>
        <Name>{name}</Name>
        <Sub>{done}개 미션 완료</Sub>
      </Info>
    </Item>
  );
}