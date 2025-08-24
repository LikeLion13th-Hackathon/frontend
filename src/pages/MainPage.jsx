// 메인페이지
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Page } from "../styles/MainPage.styles";
import TutorialModal from "../components/MainPage/TutorialModal";
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
  const [tutorialOpen, setTutorialOpen] = useState(false); // 튜토리얼 모달창 관련

  useEffect(() => {
    const globalSeen = localStorage.getItem("tutorialSeen_global");
    if (!globalSeen) {
      setTutorialOpen(true);
      localStorage.setItem("tutorialSeen_global", "true");
      return;
    }
    const loginSeen = localStorage.getItem("tutorialSeen_login");
    if (loginSeen === "false") {
      setTutorialOpen(true);
      localStorage.setItem("tutorialSeen_login", "true");
    }
  }, []);

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
        <MainPageHeader
          coins={homeCard?.coins}
          userName={userName}
          onHelpClick={() => setTutorialOpen(true)}
        />
        <Page>
          {homeCard && (
            <CharacterCard
              bg={`url(${BACKGROUND_MAP[homeCard.backgroundName] || BgEx})`}
              levelText={`Level ${homeCard.character.level}`}
              name={homeCard.characterName}
              progress={
                (homeCard.character.feedProgress /
                  homeCard.character.feedsRequiredToNext) *
                100
              }
              onClick={() => navigate("/shop")}
            />
          )}
        </Page>

        <h2 style={{ fontSize: "18px", margin: "18px 6px 10px" }}>
          오늘의 추천 미션
        </h2>
        <MissionList
          items={missions.map((m) => {
            const categoryInfo =
              MISSION_CATEGORY[m.category] || MISSION_CATEGORY.ETC;
            return {
              id: m.missionId,
              apiCategory: m.category,
              category: categoryInfo.label,
              image: categoryInfo.image,
              title: m.title,
              points: m.rewardPoint,
              badgeTextColor: categoryInfo.badgeTextColor,
              status: m.status,
            };
          })}
          onClick={(id) => {
            const selected = missions.find((m) => m.missionId === id);
            navigate(`/mission/${id}`, {
              state: { category: selected.category },
            });
          }}
        />
      </Container>
      <Footer />
      <TutorialModal
        open={tutorialOpen}
        onClose={() => {
          setTutorialOpen(false);
          localStorage.setItem("tutorialSeen", "true");
        }}
      />
    </>
  );
}

export default MainPage;
