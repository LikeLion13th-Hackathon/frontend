// 영수증 스캔에 따른 성공/실패 여부 확인 페이지
// OCR API 나오면 리팩토링 필요!!!!!!!!
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../styles/MyPage.styles";
import ReceiptScan from "../../assets/icons/ReceiptScan.png";

function ReceiptScanning() {
  const navigate = useNavigate();
  const location = useLocation();
  const image = location.state?.image;

  useEffect(() => {
    // OCR 호출 시뮬레이션 (하드코딩!!!!!!!!!!!!!!!!!!!!!!!!!!1)
    const timer = setTimeout(() => {
      const success = Math.random() > 0.3; // 70% 성공 예시
      if (success) {
        navigate("/receipt/confirm", { state: { image } });
      } else {
        navigate("/receipt/fail");
      }
    }, 3000); // 3초 후 결과 표시

    return () => clearTimeout(timer);
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
