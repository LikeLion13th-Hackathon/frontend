// 미션 목록 페이지
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

export default function Mission() {
  const navigate = useNavigate();
  const [missions, setMissions] = useState([]);
  const [activeTab, setActiveTab] = useState("전체");
  const [location, setLocation] = useState("위치 확인 중…");

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

  // 모든 미션 불러오기
  useEffect(() => {
    const loadAllMissions = async () => {
      try {
        const [custom, restaurants, landmarks, specialties] = await Promise.all(
          [
            fetchCustomMissions(),
            fetchRestaurantMissions(),
            fetchLandmarkMissions(),
            fetchSpecialtyMissions(),
          ]
        );

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

    // 위치 가져오기 (카카오맵 API)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.coord2Address(longitude, latitude, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              setLocation(result[0].address.address_name);
            }
          });
        },
        (err) => {
          console.error("위치 권한 에러:", err);
          setLocation("위치 정보를 가져올 수 없습니다");
        }
      );
    }
  }, []);

  // 카테고리 (탭 구분)
  const categories = [
    "전체",
    ...Object.values(MISSION_CATEGORY).map((c) => c.label),
  ];

  // 탭별 필터링
  const filteredMissions =
    activeTab === "전체"
      ? missions
      : missions.filter((m) => m.category === activeTab);

  return (
    <>
      <h3 style={{ textAlign: "center" }}>미션</h3>

      {/* 카테고리 탭 */}
      <CategoryTabs>
        {categories.map((c) => (
          <CategoryButton
            key={c}
            $active={activeTab === c}
            onClick={() => setActiveTab(c)}
          >
            {c}
          </CategoryButton>
        ))}
      </CategoryTabs>

      {/* 위치 바 */}
      <LocationBar location={location} />

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
