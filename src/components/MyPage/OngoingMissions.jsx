import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header, BackIcon } from "../../styles/MyPage.styles";
import MissionList from "../../components/MainPage/MissionList";
import { InfoText } from "../MissionDetail/ReceiptUpload";
import { MISSION_CATEGORY } from "../../constants/missionCategory";
import { fetchOngoingMissions } from "../../api/mypage";

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

function OngoingMissions() {
  const navigate = useNavigate();
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const loadMissions = async () => {
      try {
        const data = await fetchOngoingMissions();
        const mapped = (data || []).map((m) => {
          const categoryInfo =
            MISSION_CATEGORY[m.category] || MISSION_CATEGORY.ETC;
          return {
            id: m.missionId,
            apiCategory: m.category,
            category: categoryInfo.label,
            image: categoryInfo.image,
            title: m.title,
            points: m.rewardPoint,
            status: normalizeStatus(m.status),
            badgeTextColor: categoryInfo.badgeTextColor,
          };
        });
        setMissions(mapped);
      } catch (err) {
        console.error("진행 중 미션 불러오기 실패:", err);
      }
    };
    loadMissions();
  }, []);

  return (
    <>
      <div style={{ padding: "2vh", paddingTop: "1vh", paddingBottom: "0" }}>
        <Header>
          <BackIcon size={20} onClick={() => navigate("/mypage")} />
          <h3>진행 중인 미션</h3>
        </Header>
      </div>

      <div style={{ padding: "2vh", paddingBottom: "12vh" }}>
        {missions.length > 0 ? (
          <MissionList
            items={missions}
            onClick={(id) => navigate(`/mission/${id}`)}
          />
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "#999",
              marginTop: "10vh",
              fontSize: "16px",
            }}
          >
            진행 중인 미션이 없습니다.
          </p>
        )}

        <InfoText style={{ marginTop: "5vh" }}>
          작은 소비가 모여 우리 동네를 깨워요.
        </InfoText>
      </div>
    </>
  );
}

export default OngoingMissions;
