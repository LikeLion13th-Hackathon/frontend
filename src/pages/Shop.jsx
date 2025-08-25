import { useMemo, useState, useEffect } from "react";
import Footer from "../components/Footer";
import TabBar from "../components/Shop/TabBar";
import CoinBadge from "../components/Shop/CoinBadge";
import { Page, CharacterWrapper } from "../styles/Shop/Shop.styles";
import GrowTab from "../components/Shop/GrowTab";
import DecoTab from "../components/Shop/DecoTab";
import CharacterSection from "../components/Shop/CharacterSection";
import useCharacterOverview from "../hooks/useCharacterOverview";
import useBgShop from "../hooks/useBgShop";
import useCoins from "../hooks/useCoins";
import useCharShop from "../hooks/useCharShop";
import { getCharImg, getCharTitle } from "../data/imageMap";
import ScreenLoader from "../components/ScreenLoader";

export default function ShopPage() {
  const [tab, setTab] = useState("GROW");

  const {
    name,
    setName,
    characterId,
    level,
    setLevel,
    feedProgress,
    setFeedProgress,
    feedsRequiredToNext,
    setFeedsRequiredToNext,
    img,
    title,
    activeBackgroundId,
    reload: reloadOverview,
    loading,
  } = useCharacterOverview();

  const bg = useBgShop();
  const { coins, setCoins, reload: reloadCoins } = useCoins();
  const char = useCharShop();

  useEffect(() => {
    if (activeBackgroundId != null && typeof bg.applyActiveFromOverview === "function") {
      bg.applyActiveFromOverview(activeBackgroundId);
    }
  }, [activeBackgroundId]);

  const activeCharImg = useMemo(() => {
    if (char.activeId) return getCharImg(char.activeId, level);
    return img;
  }, [char.activeId, level, img]);

  const activeCharTitle = useMemo(() => {
    if (char.activeId) return getCharTitle(char.activeId, level);
    return title || "";
  }, [char.activeId, level, title]);

  const pageStyle = useMemo(() => {
    if (!bg.activeImg) return undefined;
    return {
      backgroundImage: `url(${bg.activeImg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
  }, [bg.activeImg]);

  const handleEditName = async () => {
    const next = prompt("캐릭터 이름을 입력하세요", name);
    if (!next || !next.trim()) return;
    try {
      await setName(next.trim());
      await reloadOverview();
    } catch {
      alert("닉네임 변경 실패. 다시 시도해주세요.");
    }
  };

  return (
    <Page style={pageStyle}>
      <TabBar active={tab} onChange={setTab} />
      <CoinBadge coin={coins} />

      <CharacterWrapper>
        <CharacterSection
          name={name}
          level={level}
          imgSrc={activeCharImg}
          editable={tab === "GROW"}
          variant={tab === "GROW" ? "grow" : "deco"}
          onEditName={handleEditName}
        />
      </CharacterWrapper>

      {tab === "GROW" ? (
        <GrowTab
          data={{
            name,
            charTitle: activeCharTitle,
            level,
            profileImage: activeCharImg,
            characterImg: activeCharImg,
            feedProgress,
            feedsRequiredToNext,
          }}
          coins={coins}
          setCoins={setCoins}
          onLevelChange={setLevel}
          onFeedProgressChange={setFeedProgress}
          onFeedsRequiredChange={setFeedsRequiredToNext}
          reloadOverview={reloadOverview}
        />
      ) : (
        <DecoTab
          coins={coins}
          setCoins={setCoins}
          reloadCoins={reloadCoins}
          bg={bg}
          skin={char}
          reloadOverview={reloadOverview}
        />
      )}
      <Footer />
      <ScreenLoader show={loading} />
    </Page>
  );
}