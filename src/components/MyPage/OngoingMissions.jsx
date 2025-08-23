import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header, BackIcon } from "../../styles/MyPage.styles";
import MissionList from "../../components/MainPage/MissionList";
import { InfoText } from "../MissionDetail/ReceiptUpload";
import { fetchMyProfile } from "../../api/mypage";

function OngoingMissions() {
  const navigate = useNavigate();
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const loadMissions = async () => {
      try {
        const data = await fetchMyProfile();
        const mapped = (data.ongoingMissions || []).map((title, idx) => ({
          id: idx + 1, // 실제 id가 없으니 index로 대체
          category: "진행 중", // 카테고리 정보가 없어서 임시값
          title,
          points: 0, // API에서 포인트 안 주면 0으로
          status: "inprogress",
        }));
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
