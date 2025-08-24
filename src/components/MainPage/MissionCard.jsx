// 미션 카드
import styled from "styled-components";
import { MISSION_CATEGORY } from "../../constants/missionCategory.js";
import Coin from "../../assets/icons/coin.png";
import { Badge } from "../../styles/MissionDetail.styles.js";
import { abandonMission as apiAbandonMission } from "../../api/mission.js";

export const Card = styled.div`
  position: relative;
  border-radius: 16px;
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  margin-bottom: 1.8vh;
  cursor: pointer;
`;

// 이미지 영역
export const Media = styled.div`
  position: relative;
  aspect-ratio: 4 / 1;
  overflow: hidden;
  background: ${({ $src }) =>
    $src ? `url(${$src}) center / cover no-repeat` : "#d1d5db"};
`;

// 미션 설명 영역
export const DBadge = styled.span`
  position: absolute;
  left: 10px;
  bottom: -14px;
  padding: 0.8vh 6vw;
  padding-bottom: 2vh;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 700;
  color: ${(p) => p.$text || "#6B4A00"};
  background-color: white;
  pointer-events: none;
`;

export const Body = styled.div`
  padding: 0.8vh 1.8vh 1.8vh 1.8vh;
`;

export const Title = styled.div`
  font-size: 15px;
  font-weight: 700;
  margin-top: 6px;
`;

export const FooterRow = styled.div`
  margin-top: 2px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2px;
  color: #6b7280;
  font-weight: 600;
  font-size: 14px;
`;

const StatusBadge = styled(Badge)`
  top: 10px;
  left: 10px;
  bottom: auto;
  position: absolute;
  z-index: 999;
  border-radius: 12px;
  color: white;
  background-color: #ebf0f7;
`;

export default function MissionCard({
  id,
  category,
  image,
  badgeLabel,
  badgeTextColor,
  title,
  points,
  status,
  onClick,
}) {
  const theme = (category && MISSION_CATEGORY[category]) || {};
  const bgSrc = image || theme.image;
  const badgeColorUse = badgeTextColor ?? theme.badgeTextColor ?? "#6B4A00";
  const label = badgeLabel ?? category ?? "미션";

  return (
    <Card onClick={onClick}>
      {status === "inProgress" && (
        <StatusBadge style={{ backgroundColor: "#FF4E69" }}>
          진행 중
        </StatusBadge>
      )}
      {status === "completed" && (
        <StatusBadge style={{ backgroundColor: "#4CAF50" }}>완료됨</StatusBadge>
      )}

      <Media $src={bgSrc}>
        <DBadge $text={badgeColorUse}>{label}</DBadge>
      </Media>
      <Body>
        <Title>{title}</Title>
        <FooterRow>
          <img src={Coin} width={18} alt="" /> {points}
        </FooterRow>
      </Body>
    </Card>
  );
}
