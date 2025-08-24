// 상점 페이지
import { useState, useMemo, useEffect } from "react";
import Footer from "../components/Footer";
import TabBar from "../components/Shop/TabBar";
import CoinBadge from "../components/Shop/CoinBadge";
import { Page } from "../styles/Shop/Shop.styles";
import bbiStep1 from "../assets/characters/bbiStep1.png";
import GrowTab from "../components/Shop/GrowTab";
import DecoTab from "../components/Shop/DecoTab";
import { getShopOverview } from "../api/shop"

import useBgShop from "../hooks/useBgShop";
import useSkinShop from "../hooks/useSkinShop";
import useCoins from "../hooks/useCoins";

import CharacterSection from "../components/Shop/CharacterSection";

// 더미
const dummy = {
  name: "삐약이",
  title: "호기심 많은 삐약이",
  level: 1,
  characterImg: bbiStep1,
  profileImage: bbiStep1,
  feedProgress: 0,
  feedsRequiredToNext: 1,
};

export default function ShopPage() {
  const [tab, setTab] = useState("GROW");
  const { coins, setCoins, reload: reloadCoins } = useCoins();

  const [name, setName] = useState("캐릭터 닉네임");
  const [level, setLevel] = useState(1);
  const [feedProgress, setFeedProgress] = useState(0);
  const [feedsRequiredToNext, setFeedsRequiredToNext] = useState(1);
  const [charImg, setCharImg] = useState(bbiStep1);
  const [charTitle, setCharTitle] = useState("");

  const bg = useBgShop();
  const skin = useSkinShop();

  const activeBg = useMemo(() => bg.items.find(v => v.active), [bg.items]);
  const activeSkin = useMemo(() => skin.items.find(v => v.active), [skin.items]);

  const pageStyle = activeBg?.img
    ? {
      backgroundImage: `url(${activeBg.img})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }
    : undefined;

  const loadOverview = async () => {
    try {
      const overview = await getShopOverview();
      const char = overview?.character ?? {};

      if (char.name != null) {
        setName(char.name);
      } else {
        setName(char.title);
      }

      if (char.level != null) {
        setLevel(char.level);
      }

      if (char.title != null) {
        setCharTitle(char.title);
      }

      if (char.feedProgress != null) {
        setFeedProgress(char.feedProgress);
      }

      if (char.feedsRequiredToNext != null) {
        setFeedsRequiredToNext(char.feedsRequiredToNext);
      }

      const img = char.charImgUrl || char.stageImgUrl || char.characterImg || activeSkin?.img || bbiStep1;
      setCharImg(img);
    } catch (error) {
      alert("상점 조회 오류. 다시 시도해 주세요");
    }
  }

  useEffect(() => { loadOverview(); }, []);

  return (
    <Page style={pageStyle}>
      <TabBar active={tab} onChange={setTab} />
      <CoinBadge coin={coins} />

      <CharacterSection
        name={name}
        level={level}
        imgSrc={charImg || activeSkin?.img || bbiStep1}
        editable={tab === "GROW"}
        variant={tab === "GROW" ? "grow" : "deco"}
        onEditName={() => {
          const next = prompt("캐릭터 이름을 입력하세요", name);
          if (typeof next === "string" && next.trim()) setName(next.trim());
        }}
      />

      {tab === "GROW" ? (
        <GrowTab
          data={{
            name,
            charTitle,
            level,
            profileImage: charImg || activeSkin?.img || bbiStep1,
            characterImg: charImg || activeSkin?.img || bbiStep1,
            feedProgress,
            feedsRequiredToNext,
          }}
          coins={coins}
          setCoins={setCoins}
          onLevelChange={setLevel}
          onFeedProgressChange={setFeedProgress}
          onFeedsRequiredChange={setFeedsRequiredToNext}
          reloadOverview={loadOverview}
        />
      ) : (
        <DecoTab
          coins={coins}
          setCoins={setCoins}
          reloadCoins={reloadCoins}
          bg={bg}
          skin={skin}
        />
      )}
      <Footer />
    </Page>
  );
}