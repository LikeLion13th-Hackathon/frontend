// 영수증 스캔에 따른 성공/실패 여부 확인 페이지
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../styles/MyPage.styles";
import ReceiptScan from "../../assets/icons/ReceiptScan.png";
import { scanReceipt } from "../../api/ocr"; // OCR API 함수 (아직 백이랑 연동 안해서 실패임!!!!!!!)

function ReceiptScanning() {
  const navigate = useNavigate();
  const location = useLocation();
  const image = location.state?.image;

  useEffect(() => {
    // OCR 호출 (실제 API 연동)
    const processReceipt = async () => {
      try {
        const result = await scanReceipt(image); // OCR API 호출
        if (result.store && result.date && result.total) {
          // OCR 성공
          navigate("/receipt/confirm", { state: { ...result, image } });
        } else {
          // OCR 실패
          navigate("/receipt/fail");
        }
      } catch (err) {
        console.error("OCR 에러:", err);
        navigate("/receipt/fail");
      }
    };

    processReceipt();
  }, [navigate, image]);

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
