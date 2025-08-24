// 메인페이지
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Page } from "../styles/MainPage.styles";
import MainPageHeader from "../components/MainPage/MainPageHeader";
import CharacterCard from "../components/MainPage/CharacterCard";
import BbiBasic from "../assets/characters/bbi_basic.png";
import BgEx from "../assets/backgrounds/BackgroundEx.png";
import MissionList from "../components/MainPage/MissionList";
import Footer from "../components/Footer";
import { fetchMainPageData } from "../api/mainPage";
import { fetchMyProfile } from "../api/mypage";
import { MISSION_CATEGORY } from "../constants/missionCategory";

// 캐릭터 카드 배경 매핑
const BACKGROUND_MAP = {
  "기본 배경": BgEx,
  // 필요시 다른 배경 추가
};

function MainPage() {
  const navigate = useNavigate();

  const [missions, setMissions] = useState([]);
  const [homeCard, setHomeCard] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [homeData, profileData] = await Promise.all([
          fetchMainPageData(),
          fetchMyProfile(),
        ]);

        setHomeCard(homeData.homeCard);
        setMissions(homeData.missions);
        setUserName(profileData?.nickname || "게스트");
      } catch (error) {
        console.error("메인페이지 데이터 로딩 실패:", error);
      }
    };
    loadData();
  }, []);

  return (
    <>
      <Container>
        <MainPageHeader coins={homeCard?.coins} userName={userName} />
        <Page>
          {homeCard && (
            <CharacterCard
              bg={`url(${BACKGROUND_MAP[homeCard.backgroundName] || BgEx})`}
              levelText={`Level ${homeCard.level}`}
              name={homeCard.characterName}
              progress={homeCard.expPercent}
              characterSrc={BbiBasic}
              onClick={() => navigate("/shop")}
            />
          )}
        </Page>

        <h2 style={{ fontSize: "18px", margin: "18px 6px 10px" }}>
          AI가 추천해주는 오늘의 미션
        </h2>
        <MissionList
          items={missions.map((m) => {
            const categoryInfo =
              MISSION_CATEGORY[m.category] || MISSION_CATEGORY.ETC;
            return {
              id: m.id,
              category: categoryInfo.label,
              image: categoryInfo.image,
              title: m.title,
              points: m.rewardPoint,
              badgeTextColor: categoryInfo.badgeTextColor,
            };
          })}
          onClick={(id) => navigate(`/mission/${id}`)}
        />
      </Container>
      <Footer />
    </>
  );
}

export default MainPage;
