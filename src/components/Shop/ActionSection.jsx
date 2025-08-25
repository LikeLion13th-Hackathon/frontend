import { TbCoin } from "react-icons/tb";
import {
  ActionGrid,
  ActionCard,
  ActionIcon,
  ActionTitle,
  ActionBadge,
  CoinIconSmall,
  BadgeText
} from "../../styles/Shop/GrowTab.styles";

export default function ActionSection({
  onMissionClick,
  onFeedClick,
  onEvolveClick,
  evolveReady = false,
  feedCost,
  evolveCost,
}) {
  const title = evolveReady ? "진화 시키기" : "먹이 주기";
  const cost = evolveReady ? evolveCost : feedCost;
  const handler = evolveReady ? onEvolveClick : onFeedClick;

  return (
    <ActionGrid>
      <ActionCard onClick={onMissionClick}>
        <ActionIcon>🍀</ActionIcon>
        <ActionTitle>코인 모으러 가기</ActionTitle>
        <ActionBadge>오늘의 미션</ActionBadge>
      </ActionCard>

      <ActionCard 
        onClick={handler}
        data-variant={evolveReady ? "primary" : undefined}
      >
        <ActionIcon>{evolveReady ? "✨" : "🍖"}</ActionIcon>
        <ActionTitle>{title}</ActionTitle>
          <ActionBadge style = {{fontSize:"12px"}}>
            <CoinIconSmall><TbCoin size={16} /></CoinIconSmall>
            <BadgeText>{cost.toLocaleString()}</BadgeText>
          </ActionBadge>
      </ActionCard>
    </ActionGrid>
  );
}