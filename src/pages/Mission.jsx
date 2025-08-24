// 미션 목록 페이지
import { useState, useEffect, useRef } from "react";
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
  fetchAIMissions,
} from "../api/mission";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export default function Mission() {
  const navigate = useNavigate();
  const [missions, setMissions] = useState([]);
  const [activeTab, setActiveTab] = useState("전체");
  const [location, setLocation] = useState("위치 확인 중…");

  // 이미 추가된 AI 미션 추적 (중복 방지)
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

  // 완료된 미션 3개마다 AI 미션 자동 활성화 + 알림
  useEffect(() => {
    const completedCount = countCompletedMissions(missions);

    if (
      completedCount >= 3 &&
      completedCount % 3 === 0 &&
      completedCount / 3 > addedAIMissionsRef.current
    ) {
      fetchAIMissions()
        .then((aiMissions) => {
          const newAIMissions = (aiMissions || []).map(mapMission);
          setMissions((prev) => [...prev, ...newAIMissions]);
          addedAIMissionsRef.current += 1;

          toast.success(
            `완료된 3개의 미션을 기반으로 AI 추천 미션 ${newAIMissions.length}개가 추가되었어요!`,
            { position: "top-center", autoClose: 3000 }
          );
        })
        .catch((err) => console.error("AI 미션 불러오기 실패:", err));
    }
  }, [missions]);

  // 카테고리 탭
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
      {/* 토스트 컨테이너 */}
      <ToastContainer />

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
