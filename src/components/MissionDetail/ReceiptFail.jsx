import { useNavigate, useLocation } from "react-router-dom";
import { InfoText } from "./ReceiptUpload";
import { Button } from "../Button";

function ReceiptFail() {
  const navigate = useNavigate();
  const location = useLocation();
  const missionId = location.state?.missionId;

  return (
    <div
      style={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "100px", margin: "3vh" }}>😢</h1>
      <h3 style={{ margin: "0", fontWeight: "800" }}>
        영수증 인식에 실패했어요.
      </h3>
      <InfoText style={{ marginBottom: "5vh" }}>
        필수 정보가 잘 나오도록 촬영하여 업로드해주세요.
      </InfoText>
      <Button
        style={{
          borderRadius: "999px",
          boxShadow: "0 4px 11px rgba(0, 0, 0, 0.25)",
        }}
        onClick={() =>
          navigate(`/receipt/upload/${missionId}`, { state: { missionId } })
        }
      >
        영수증 재업로드하러 가기
      </Button>
    </div>
  );
}

export default ReceiptFail;
