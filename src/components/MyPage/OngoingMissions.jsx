import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header, BackIcon } from "../../styles/MyPage.styles";
import MissionList from "../../components/MainPage/MissionList";
import { InfoText } from "../MissionDetail/ReceiptUpload";

function OngoingMissions() {
  const navigate = useNavigate();
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    // 더미데이터
    const dummy = [
      {
        id: 1,
        category: "지역맛집",
        title: "더미데이터",
        points: 100,
        status: "ready",
      },
      {
        id: 2,
        category: "지역명소",
        title: "더미2",
        points: 300,
        status: "ready",
      },
    ];
    setMissions(dummy);
  }, []);

  return (
    <>
      <div style={{ padding: "2vh", paddingTop: "1vh", paddingBottom: "0" }}>
        <Header>
          <BackIcon size={20} onClick={() => navigate(-1)} />
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
