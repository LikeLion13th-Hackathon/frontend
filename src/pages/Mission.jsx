// 미션 목록 페이지
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CategoryTabs, CategoryButton } from "../styles/Mission.styles";
import LocationBar from "../components/Mission/LocationBar";
import MissionList from "../components/MainPage/MissionList";
import { InfoText } from "../components/MissionDetail/ReceiptUpload";
import Footer from "../components/Footer";
import { MISSION_CATEGORY } from "../constants/missionCategory";
import {
  fetchCustomMissions,
  fetchRestaurantMissions,
  fetchLandmarkMissions,
  fetchSpecialtyMissions,
  fetchAIMissions,
} from "../api/mission";

// 상태 정규화
const normalizeStatus = (status) => {
  switch (status) {
    case "IN_PROGRESS":
      return "inProgress";
    case "COMPLETED":
      return "completed";
    case "ABANDONED":
      return "abandoned";
    case "READY":
    default:
      return "ready";
  }
};

// 완료 미션 수 카운트
const countCompletedMissions = (missions) =>
  missions.filter((m) => m.status === "completed").length;

// 배열 섞기 유틸
const shuffleArray = (arr) => {
  return [...arr].sort(() => Math.random() - 0.5);
};

export default function Mission() {
  const navigate = useNavigate();
  const location = useLocation();
  const [missions, setMissions] = useState([]);
  const [activeTab, setActiveTab] = useState("전체");
  const [locationText, setLocationText] = useState("위치 확인 중…");
  const [completedCount, setCompletedCount] = useState(0);
  const [aiAdded, setAiAdded] = useState(false);

  // 이미 추가된 AI 미션 추적
  const addedAIMissionsRef = useRef(0);

  // API에서 불러온 카테고리 매핑
  const mapMission = (m) => {
    const categoryInfo = MISSION_CATEGORY[m.category] || MISSION_CATEGORY.ETC;
    return {
      id: m.missionId,
      apiCategory: m.category,
      category: categoryInfo.label,
      image: m.imageUrl || categoryInfo.image,
      title: m.title,
      points: m.rewardPoint,
      status: normalizeStatus(m.status),
      badgeTextColor: categoryInfo.badgeTextColor,
    };
  };

  // 모든 미션 불러오기 (초기 로딩)
  useEffect(() => {
    const loadAllMissions = async () => {
      try {
        const custom = await fetchCustomMissions();
        const [restaurants, landmarks, specialties] = await Promise.all([
          fetchRestaurantMissions(),
          fetchLandmarkMissions(),
          fetchSpecialtyMissions(),
        ]);

        const combined = [
          ...(custom || []).map(mapMission),
          ...(restaurants || []).map(mapMission),
          ...(landmarks || []).map(mapMission),
          ...(specialties || []).map(mapMission),
        ];

        setMissions(combined);
      } catch (err) {
        console.error("미션 불러오기 실패:", err);
      }
    };

    loadAllMissions();

    // 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.coord2Address(longitude, latitude, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              setLocationText(result[0].address.address_name);
            }
          });
        },
        (err) => {
          console.error("위치 권한 에러:", err);
          setLocationText("위치 정보를 가져올 수 없습니다");
        }
      );
    }
  }, []);

  // 미션 변경될 때마다 완료 개수 갱신
  useEffect(() => {
    setCompletedCount(countCompletedMissions(missions));
  }, [missions]);

  // 완료된 미션 3개마다 AI 미션 자동 활성화 + 배너 고정
  useEffect(() => {
    if (
      completedCount >= 3 &&
      completedCount % 3 === 0 &&
      completedCount > addedAIMissionsRef.current
    ) {
      fetchAIMissions()
        .then((aiMissions) => {
          const newAIMissions = (aiMissions || [])
            .map(mapMission)
            .filter((ai) => !missions.some((m) => m.id === ai.id));

          if (newAIMissions.length > 0) {
            setMissions((prev) => [...prev, ...newAIMissions]);
            addedAIMissionsRef.current = completedCount;

            setAiAdded(true);
          }
        })
        .catch((err) => console.error("AI 미션 불러오기 실패:", err));
    }
  }, [completedCount]);

  // 카테고리 탭
  const categories = [
    "전체",
    ...Object.values(MISSION_CATEGORY)
      .map((c) => c.label)
      .filter((label) => label !== "AI 추천"),
  ];

  // 완료 미션은 맨 밑으로 보내기
  const sortByStatus = (arr) => {
    return [...arr].sort((a, b) => {
      if (a.status === "completed" && b.status !== "completed") return 1;
      if (a.status !== "completed" && b.status === "completed") return -1;
      return 0;
    });
  };

  // 탭별 필터링
  const filteredMissions =
    activeTab === "전체"
      ? sortByStatus([
          ...missions.filter((m) => m.apiCategory === "CUSTOM"),
          ...missions.filter((m) => m.apiCategory === "AI_CUSTOM"),
          ...missions.filter(
            (m) => !["CUSTOM", "AI_CUSTOM"].includes(m.apiCategory)
          ),
        ])
      : activeTab === "맞춤미션"
      ? sortByStatus(
          shuffleArray(missions.filter((m) => m.apiCategory === "CUSTOM"))
        )
      : activeTab === "AI 추천"
      ? sortByStatus(missions.filter((m) => m.apiCategory === "AI_CUSTOM"))
      : sortByStatus(missions.filter((m) => m.category === activeTab));

  return (
    <>
      <h3 style={{ textAlign: "center" }}>미션</h3>

      {/* 카테고리 탭 */}
      <CategoryTabs>
        {categories.map((c) => (
          <CategoryButton
            key={c}
            $active={activeTab === c}
            $category={c}
            onClick={() => setActiveTab(c)}
          >
            {c}
          </CategoryButton>
        ))}
      </CategoryTabs>

      {/* 위치 바 */}
      <LocationBar location={locationText} />

      {/* AI 미션 배너 */}
      {aiAdded && (
        <div
          style={{
            textAlign: "center",
            background: "#f0f0ff",
            color: "#6C63FF",
            padding: "4px",
            borderRadius: "8px",
            margin: "2px auto",
            width: "90%",
            fontSize: "15px",
          }}
        >
          이제부터 AI 추천 미션이 함께 제공돼요 🎉
        </div>
      )}

      {/* 미션 목록 */}
      <div style={{ padding: "2vh", paddingBottom: "12vh" }}>
        {filteredMissions.length > 0 ? (
          <MissionList
            items={filteredMissions}
            onClick={(id) => {
              const selected = missions.find((m) => m.id === id);
              navigate(`/mission/${id}`, {
                state: { category: selected.apiCategory },
              });
            }}
          />
        ) : (
          <p style={{ textAlign: "center", color: "#888" }}>미션이 없습니다.</p>
        )}

        <InfoText style={{ marginTop: "5vh" }}>
          작은 소비가 모여 우리 동네를 깨워요.
        </InfoText>
      </div>

      <Footer />
    </>
  );
}
