import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../styles/MyPage.styles";
import ReceiptScan from "../../assets/icons/ReceiptScan.png";
import { getReceiptOCR } from "../../api/receipt"; 

function ReceiptScanning() {
  const navigate = useNavigate();
  const location = useLocation();
  const { missionId, receiptId } = location.state || {};

  useEffect(() => {
    const processReceipt = async () => {
      try {
        const result = await getReceiptOCR(missionId, receiptId);

        if (result.verificationStatus === "MATCHED") {
          navigate("/receipt/confirm", { state: result });
        } else if (result.verificationStatus === "REJECTED") {
          navigate("/receipt/fail", {
            state: { missionId, rejectReason: result.rejectReason },
          });
        } else {
          // PENDING 상태면 2초 후 재시도
          setTimeout(processReceipt, 2000);
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
        <img src={ReceiptScan} alt="스캔중" />
        <p style={{ marginTop: "5vh", fontSize: "18px", fontWeight: "700" }}>
          영수증 스캔 중...
        </p>
      </div>
    </div>
  );
}

export default ReceiptScanning;
