import CharacterSection from "./CharacterSection";
import LevelInfo from "./LevelInfo";
import { GrowPanel, GrowBox, Divider } from "../../styles/Shop.styles";
import ActionSection from "./ActionSection";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function GrowTab({ data, coins, setCoins  }) {
  const navigate = useNavigate();

  const FEED_COST = 100;

  const [level, setLevel] = useState(data.level);
  const [feedProgress, setFeedProgress] = useState(data.feedProgress);
  const [feedsRequiredToNext, setFeedsRequiredToNext] = useState(data.feedsRequiredToNext);
  
  const percent = Math.min(100, +((feedProgress / Math.max(1, feedsRequiredToNext)) * 100).toFixed(1));
  const evolveReady = feedProgress >= feedsRequiredToNext || percent >= 100;

  const handleFeed = () => {
    if (evolveReady) return;
     if (coins < FEED_COST) {
      alert("코인이 부족합니다");
      return;
    }

    setCoins(coins - FEED_COST);
    setFeedProgress(p => Math.min(p + 1, feedsRequiredToNext));
  };

  const handleEvolve = () => {
    if (!evolveReady) return;
    if (coins < FEED_COST) {
      alert("코인이 부족합니다");
      return;
    }
    setCoins(coins - FEED_COST);
    setLevel(lv => lv + 1);
    setFeedProgress(0);
    setFeedsRequiredToNext(r => Math.max(1, r * 2));
  };


  return (
    <GrowPanel>
      <CharacterSection name={data.name} level={level} imgSrc={data.characterImg} />

      <GrowBox>
        <LevelInfo
          profileImage={data.profileImage}
          levelText={`Level ${level}`}
          nameText={data.nickname || data.name}
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
    </GrowPanel>
  );
}