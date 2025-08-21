// 미션 목록 페이지
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryTabs, CategoryButton } from "../styles/Mission.styles";
import LocationBar from "../components/Mission/LocationBar";
import MissionList from "../components/MainPage/MissionList";
import { InfoText } from "../components/MissionDetail/ReceiptUpload";
import Footer from "../components/Footer";

export default function Mission() {
  const navigate = useNavigate();
  const [missions, setMissions] = useState([]);
  const [activeTab, setActiveTab] = useState("전체");
  const [location, setLocation] = useState("위치 확인 중…");

  useEffect(() => {
    // 미션 목록: 나중에 API 연결!!!!!!!!!!
    setMissions([
      {
        id: "1",
        category: "맞춤미션",
        title: "00동 음식점에서 7000원 이상 결제하기",
        points: 100,
        status: "ready",
      },
      {
        id: "2",
        category: "지역명소",
        title: "ㅁㅁ구 박물관 방문하기",
        points: 300,
        status: "ready",
      },
      {
        id: "3",
        category: "기타",
        title: "기타 기타 기타",
        points: 500,
        status: "ready",
      },
      {
        id: "4",
        category: "지역명소",
        title: "산책로에서 사진 찍기",
        points: 150,
        status: "ready",
      },
      {
        id: "5",
        category: "맞춤미션",
        title: "asdfasdf",
        points: 150,
        status: "ready",
      },
    ]);

    // 사용자 위치 가져오기 (카카오맵 API)
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

  const categories = [
    "전체",
    "맞춤미션",
    "지역명소",
    "지역맛집",
    "특산품",
    "기타",
  ];

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
        <MissionList
          items={filteredMissions}
          onClick={(id) => navigate(`/mission/${id}`)}
        />
        <InfoText style={{ marginTop: "5vh" }}>
          작은 소비가 모여 우리 동네를 깨워요.
        </InfoText>
      </div>
      <Footer />
    </>
  );
}
