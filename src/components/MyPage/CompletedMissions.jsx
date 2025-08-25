import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header, BackIcon } from "../../styles/MyPage.styles";
import MissionList from "../../components/MainPage/MissionList";
import { InfoText } from "../MissionDetail/ReceiptUpload";
import { MISSION_CATEGORY } from "../../constants/missionCategory";
import { fetchCompletedMissions } from "../../api/mypage";

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

function CompletedMissions() {
  const navigate = useNavigate();
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCompletedMissions();
        const formatted = (data || []).map((m) => {
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
        setMissions(formatted);
      } catch (err) {
        console.error("완료한 미션 불러오기 실패:", err);
      }
    };
    load();
  }, []);

  return (
    <>
      <div style={{ padding: "2vh", paddingTop: "1vh", paddingBottom: 0 }}>
        <Header>
          <BackIcon size={20} onClick={() => navigate("/mypage")} />
          <h3>완료한 미션</h3>
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
              marginTop: "30vh",
              fontSize: "16px",
            }}
          >
            완료한 미션이 없습니다.
          </p>
        )}

        <InfoText style={{ marginTop: "5vh" }}>
          지금 바로 미션을 시작해보세요!
        </InfoText>
      </div>
    </>
  );
}

export default CompletedMissions;
