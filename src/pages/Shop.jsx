// 상점 페이지
import { useState, useMemo } from "react";
import Footer from "../components/Footer";
import TabBar from "../components/Shop/TabBar";
import CoinBadge from "../components/Shop/CoinBadge";
import { Page } from "../styles/Shop/Shop.styles";
import BbiBasic from "../assets/characters/bbi_basic.png";
import spiderman from "../assets/임시.jpg";
import GrowTab from "../components/Shop/GrowTab";
import DecoTab from "../components/Shop/DecoTab";

import useBgShop from "../hooks/useBgShop";
import useSkinShop from "../hooks/useSkinShop";
import useCoins from "../hooks/useCoins";

import CharacterSection from "../components/Shop/CharacterSection";

// 더미
const dummy = {
  name: "삐약이",
  title: "호기심 많은 삐약이",
  level: 3,
  characterImg: BbiBasic,
  profileImage: spiderman,
  feedProgress: 2,
  feedsRequiredToNext: 4,
};

export default function ShopPage() {
  const [tab, setTab] = useState("GROW");
  const { coins, setCoins, reload: reloadCoins } = useCoins();
  const [name, setName] = useState(dummy.name);
  const [level, setLevel] = useState(dummy.level);

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

  return (
    <Page style={pageStyle}>
      <TabBar active={tab} onChange={setTab} />
      <CoinBadge coin={coins} />

      <CharacterSection
        name={name}
        level={level}
        imgSrc={activeSkin?.img || BbiBasic}
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
            ...dummy,
            name,
            level,
            characterImg: activeSkin?.img || dummy.characterImg,
          }}
          coins={coins}
          setCoins={setCoins}
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