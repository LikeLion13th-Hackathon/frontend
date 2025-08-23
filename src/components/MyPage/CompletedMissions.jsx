import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header, BackIcon } from "../../styles/MyPage.styles";
import MissionList from "../../components/MainPage/MissionList";
import { InfoText } from "../MissionDetail/ReceiptUpload";
import { fetchMyProfile } from "../../api/mypage";

function CompletedMissions() {
  const navigate = useNavigate();
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMyProfile();
        const formatted = (data.completedMissions || []).map((title, idx) => ({
          id: idx + 1, // 고유 id 필요하니까 index 사용
          category: "완료 미션", // 카테고리는 서버에서 안 주므로 placeholder
          title,
          points: 0, // 포인트도 없으니 0으로
          status: "completed", // 완료 상태 고정
        }));
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
