import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Page } from "../styles/MainPage.styles";
import TutorialModal from "../components/MainPage/TutorialModal";
import MainPageHeader from "../components/MainPage/MainPageHeader";
import CharacterCard from "../components/MainPage/CharacterCard";
import MissionList from "../components/MainPage/MissionList";
import Footer from "../components/Footer";

import { fetchCustomMissionsLimited } from "../api/mainPage";
import { fetchMyProfile } from "../api/mypage";
import { MISSION_CATEGORY } from "../constants/missionCategory";

import useCharacterOverview from "../hooks/useCharacterOverview";
import useCoins from "../hooks/useCoins";
import { getBgImg } from "../data/imageMap";
import ScreenLoader from "../components/ScreenLoader";

export default function MainPage() {
  const navigate = useNavigate();

  const {
    name,            // 서버 닉네임
    title,           // 레벨/스킨에 따른 타이틀
    level,
    img,             // 레벨/스킨 매핑된 이미지
    activeBackgroundId,
    feedProgress,
    feedsRequiredToNext,
    loading: overviewLoading,
  } = useCharacterOverview();

  const { coins } = useCoins();

  const [missions, setMissions] = useState([]);
  const [userName, setUserName] = useState("");
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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

  // 추천 미션 + 프로필만 불러옴 (캐릭터는 훅이 담당)
  useEffect(() => {
    let aborted = false;
    (async () => {
      try {
        setLoading(true);
        const [missionsData, profileData] = await Promise.all([
          fetchCustomMissionsLimited(3),
          fetchMyProfile(),
        ]);
        if (aborted) return;
        setMissions(missionsData || []);
        setUserName(profileData?.nickname || "게스트");
      } catch (e) {
        console.error("메인페이지 데이터 로딩 실패:", e);
      } finally {
        setLoading(false);
      }
    })();
    return () => { aborted = true; };
  }, []);

  // 게이지 계산 (feed / (feed + need))
  const progressPercent = (() => {
    const cur = Number(feedProgress ?? 0);
    const need = Number(feedsRequiredToNext ?? 0);
    const denom = Math.max(1, cur + need);
    return Math.min(100, Math.round((cur / denom) * 100));
  })();

  return (
    <>
      <Container>
        <MainPageHeader
          coins={coins}
          userName={userName}
          onHelpClick={() => setTutorialOpen(true)}
        />

        {/* 캐릭터 카드 */}
        <Page>
          {!overviewLoading && (
            <CharacterCard
              bg={`url(${getBgImg(activeBackgroundId)})`}
              levelText={`Level ${level}`}
              name={name || title}
              progress={progressPercent}
              imgSrc={img}
              onClick={() => navigate("/shop")}
            />
          )}
        </Page>

        {/* 오늘의 추천 미션 */}
        <h2 style={{ fontSize: "18px", margin: "18px 6px 10px" }}>
          오늘의 추천 미션
        </h2>
        <MissionList
          items={(missions || []).map((m) => {
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

      {/* 캐릭터/미션 로딩 모두 표시 */}
      <ScreenLoader show={loading || overviewLoading} />
    </>
  );
}