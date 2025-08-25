import LevelInfo from "./LevelInfo";
import { Panel, Divider } from "../../styles/Shop/Shop.styles";
import { GrowBox } from "../../styles/Shop/GrowTab.styles";
import ActionSection from "./ActionSection";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { feed, evolve } from "../../api/shop";

export default function GrowTab({
  data, coins, setCoins,
  onLevelChange, onFeedProgressChange, onFeedsRequiredChange,
  reloadOverview
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const FEED_COST = 100;
  const evolveCostMap = { 1: 300, 2: 500 };
  const EVOLVE_COST = evolveCostMap[data.level] || 500;

  const { feedProgress, feedsRequiredToNext } = data;

  const totalNeed = Math.max(1, feedProgress + Math.max(0, feedsRequiredToNext));
  const percent = Math.min(100, +((feedProgress / totalNeed) * 100).toFixed(1));
  const evolveReady = (feedsRequiredToNext ?? 0) <= 0;

  const handleFeed = async () => {
    if (loading || evolveReady) return;
    if (coins < FEED_COST) return alert("코인이 부족합니다");

    setLoading(true);
    try {
      const res = await feed();
      if (res.coins != null) setCoins(res.coins);
      else setCoins(c => c - FEED_COST);

      if (res.level != null) onLevelChange(() => res.level);
      if (res.feedProgress != null) onFeedProgressChange(res.feedProgress);
      if (res.feedsRequiredToNext != null) onFeedsRequiredChange(res.feedsRequiredToNext);
    } catch {
      alert("먹이 주기 실패. 다시 시도해 주세요");
    } finally {
      setLoading(false);
    }
  };

  const handleEvolve = async () => {
    if (!evolveReady) return;
    if (coins < EVOLVE_COST) return alert("코인이 부족합니다");

    setLoading(true);
    try {
      const res = await evolve();
      if (res.coins != null) setCoins(res.coins);
      else setCoins(c => Math.max(0, c - EVOLVE_COST));

      if (res.level != null) onLevelChange(res.level);
      else onLevelChange(lv => lv + 1);

      if (res.feedProgress != null) onFeedProgressChange(res.feedProgress);
      else onFeedProgressChange(0);

      if (res.feedsRequiredToNext != null) onFeedsRequiredChange(res.feedsRequiredToNext);
      else onFeedsRequiredChange(r => Math.max(1, r * 2));

      await reloadOverview();
    } catch {
      alert("진화 실패. 다시 시도해 주세요");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Panel>
      <GrowBox>
        <LevelInfo
          profileImage={data.profileImage}
          levelText={`Level ${data.level}`}
          titleText={data.charTitle}
          percent={percent}
        />

        <Divider />

        <ActionSection
          evolveReady={evolveReady}
          onEvolveClick={handleEvolve}
          onFeedClick={handleFeed}
          onMissionClick={() => navigate("/mission")}
          feedCost={FEED_COST}
          evolveCost={EVOLVE_COST}
        />
      </GrowBox>
    </Panel>
  );
}