import LevelInfo from "./LevelInfo";
import { Panel, Divider } from "../../styles/Shop/Shop.styles";
import { GrowBox } from "../../styles/Shop/GrowTab.styles";
import ActionSection from "./ActionSection";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { feed } from "../../api/shop";

export default function GrowTab({ data, coins, setCoins, onLevelChange }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const FEED_COST = 100;

  const [feedProgress, setFeedProgress] = useState(data.feedProgress);
  const [feedsRequiredToNext, setFeedsRequiredToNext] = useState(data.feedsRequiredToNext);

  const percent = Math.min(100, +((feedProgress / Math.max(1, feedsRequiredToNext)) * 100).toFixed(1));
  const evolveReady = feedProgress >= feedsRequiredToNext || percent >= 100;

  const handleFeed = async () => {
    if (loading || evolveReady) return;

    if (coins < FEED_COST) {
      alert("코인이 부족합니다");
      return;
    }

    setLoading(true);
    try {
      const res = await feed();

      if (res.coins != null) {
        setCoins(res.coins);
      } else {
        setCoins(c => c - FEED_COST);
      }

      if (res.level != null) {
        onLevelChange(() => res.level);
      }

      if (res.feedProgress != null) {
        setFeedProgress(res.feedProgress);
      }
      
      if (res.feedsRequiredToNext != null) {
        setFeedsRequiredToNext(res.feedsRequiredToNext);
      }
    }
    catch (error) {
      alert("먹이 주기 실패. 다시 시도해 주세요");
    }
    finally {
      setLoading(false);
    }
  };

  const handleEvolve = () => {
    if (!evolveReady) return;
    if (coins < FEED_COST) {
      alert("코인이 부족합니다");
      return;
    }
    setCoins(coins - FEED_COST);
    onLevelChange(lv => lv + 1);
    setFeedProgress(0);
    setFeedsRequiredToNext(r => Math.max(1, r * 2));
  };


  return (
    <Panel>
      <GrowBox>
        <LevelInfo
          profileImage={data.profileImage}
          levelText={`Level ${data.level}`}
          titleText={data.title}
          percent={percent}
        />

        <Divider />

        <ActionSection
          evolveReady={evolveReady}
          onEvolveClick={handleEvolve}
          onFeedClick={handleFeed}
          onMissionClick={() => navigate("/mission")}
          cost={FEED_COST}
        />
      </GrowBox>
    </Panel>
  );
}