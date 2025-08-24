import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { InfoText } from "./ReceiptUpload";
import { Button } from "../Button";
import ConfettiExplosion from "react-confetti-explosion";
import { completeMission } from "../../api/mission";

function ReceiptSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { missionId, receiptId } = location.state || {};

  useEffect(() => {
    const complete = async () => {
      if (!missionId || !receiptId) return;

      try {
        await completeMission(missionId, receiptId);
        console.log("미션 완료 API 호출 성공");
      } catch (err) {
        console.error("미션 완료 API 호출 실패:", err);
      }
    };

    complete();
  }, [missionId, receiptId]);

  return (
    <div
      style={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", left: "10%", top: "20%" }}>
        <ConfettiExplosion />
      </div>
      <div style={{ position: "absolute", right: "10%", top: "20%" }}>
        <ConfettiExplosion />
      </div>

      <h1 style={{ fontSize: "100px", margin: "3vh" }}>🥳</h1>
      <h3 style={{ fontWeight: "800", margin: "0" }}>
        미션 성공! <br />
        리워드가 지급되었어요.
      </h3>
      <InfoText style={{ marginBottom: "5vh" }}>
        작은 소비가 모여 우리 동네를 깨워요.
      </InfoText>
      <Button
        style={{
          borderRadius: "999px",
          boxShadow: "0 4px 11px rgba(0, 0, 0, 0.25)",
        }}
        onClick={() => navigate("/mission")}
      >
        다른 미션 둘러보기
      </Button>
    </div>
  );
}

export default ReceiptSuccess;
