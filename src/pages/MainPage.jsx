import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Page } from "../styles/MainPage.styles";
import TutorialModal from "../components/MainPage/TutorialModal";
import MainPageHeader from "../components/MainPage/MainPageHeader";
import CharacterCard from "../components/MainPage/CharacterCard";
import MissionList from "../components/MainPage/MissionList";
import Footer from "../components/Footer";
import { fetchHomeCard, fetchCustomMissionsLimited } from "../api/mainPage";
import { fetchMyProfile } from "../api/mypage";
import { MISSION_CATEGORY } from "../constants/missionCategory";

// 상점과 동일한 매핑 유틸
import { getBgImg, getCharImg, getCharTitle } from "../data/imageMap";

function MainPage() {
  const navigate = useNavigate();

  const [missions, setMissions] = useState([]);
  const [homeCard, setHomeCard] = useState(null);
  const [userName, setUserName] = useState("");
  const [tutorialOpen, setTutorialOpen] = useState(false);

  // 튜토리얼 모달 체크
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

  // 홈 카드 + 미션 + 프로필 불러오기
  useEffect(() => {
    const loadData = async () => {
      try {
        const [homeData, missionsData, profileData] = await Promise.all([
          fetchHomeCard(),
          fetchCustomMissionsLimited(3),
          fetchMyProfile(),
        ]);

        setHomeCard(homeData);
        setMissions(missionsData);
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

        {/* 캐릭터카드 */}
        <Page>
          {homeCard && (
            <CharacterCard
              bg={`url(${getBgImg(homeCard.activeBackgroundId)})`}
              levelText={`Level ${homeCard.level}`}
              name={
                homeCard.displayName ||
                getCharTitle(homeCard.activeCharacterId, homeCard.level)
              }
              progress={homeCard.progressPercent}
              imgSrc={getCharImg(homeCard.activeCharacterId, homeCard.level)}
              onClick={() => navigate("/shop")}
            />
          )}
        </Page>

        {/* 추천 미션 */}
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
              state: { category: selected?.category },
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
