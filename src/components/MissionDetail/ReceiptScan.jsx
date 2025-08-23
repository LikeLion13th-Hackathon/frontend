// 영수증 스캔에 따른 성공/실패 여부 확인 페이지
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../styles/MyPage.styles";
import ReceiptScan from "../../assets/icons/ReceiptScan.png";
import { checkReceiptOCR } from "../../api/ocr";

function ReceiptScanning() {
  const navigate = useNavigate();
  const location = useLocation();
  const { missionId, receiptId } = location.state || {};

  useEffect(() => {
    const processReceipt = async () => {
      try {
        const result = await checkReceiptOCR(missionId, receiptId);

        if (result.verificationStatus === "MATCHED") {
          navigate("/receipt/confirm", { state: result });
        } else if (result.verificationStatus === "REJECTED") {
          navigate("/receipt/fail", { state: { missionId } });
        } else {
          // 아직 OCR PENDING이나 RUNNING이면 대기 화면 유지
          setTimeout(processReceipt, 2000); // 2초 후 재시도 (polling)
        }
      } catch (err) {
        console.error("OCR 에러:", err);
        navigate("/receipt/fail", { state: { missionId } });
      }
    };

    processReceipt();
  }, [missionId, receiptId, navigate]);

  return (
    <div
      style={{
        padding: "2vh",
        paddingTop: "1vh",
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
      }}
    >
      <Header>
        <h3>영수증 인증</h3>
      </Header>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={ReceiptScan} />
        <p style={{ marginTop: "5vh", fontSize: "18px", fontWeight: "700" }}>
          영수증 스캔 중...
        </p>
      </div>
    </div>
  );
}

export default ReceiptScanning;
