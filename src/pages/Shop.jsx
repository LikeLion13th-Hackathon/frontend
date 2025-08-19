// 상점 페이지
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import ShopTabs from "../components/Shop/ShopTabs";
import CoinBadge from "../components/Shop/CoinBadge";
import { Page, AppBar, Title, Body, Placeholder } from "../styles/Shop.styles";
import BbiBasic from "../assets/characters/bbi_basic.png";
import spiderman from "../assets/임시.jpg";
import GrowTab from "../components/Shop/GrowTab";


export default function ShopPage() {
  const [tab, setTab] = useState("grow");
  const [coins, setCoins] = useState(1083);

  // 더미
  const dummy = {
    name: "삐약이",
    nickname: "호기심 많은 삐약이",
    level: 3,
    characterImg: BbiBasic,
    profileImage: spiderman,
    feedProgress: 2,
    feedsRequiredToNext: 4,
  };


  return (
    <Page>

      <ShopTabs active={tab} onChange={setTab} />
      <CoinBadge coin={coins} />
      <section
        id="tabpanel-grow"
        role="tabpanel"
        hidden={tab !== "grow"}
      >
        <GrowTab data={dummy} coins={coins} setCoins={setCoins} />
      </section>

      <section
        id="tabpanel-decorate"
        role="tabpanel"
        hidden={tab !== "decorate"}
      >
        { }
      </section>
      <Footer />
    </Page>
  );
}