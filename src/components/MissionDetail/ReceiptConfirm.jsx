import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../styles/MyPage.styles";
import { UploadBox } from "./ReceiptUpload";
import {
  Section,
  FieldTitle,
  FieldText,
} from "../../styles/MissionDetail.styles";

function ReceiptConfirm() {
  const navigate = useNavigate();
  const location = useLocation();
  const image = location.state?.image;
  const ocrData = location.state?.ocrData || {
    store: "○○식당",
    address: "○○광역시 ○○동 ○○구 ○○빌딩 1층",
    date: "2025.08.13 오전 11시 38분",
    amount: "18,500원",
  };

  return (
    <div
      style={{
        padding: "2vh",
        paddingTop: "1vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header>
        <h3>영수증 확인</h3>
      </Header>

      {/* 업로드한 영수증 이미지 */}
      <UploadBox>
        {image && (
          <img
            src={image}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        )}
      </UploadBox>

      {/* OCR 결과 */}
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          marginTop: "2vh",
          borderRadius: "12px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
          padding: "16px",
        }}
      >
        <Section>
          <FieldTitle>{ocrData.store}</FieldTitle>
          <FieldText>{ocrData.address}</FieldText>
        </Section>
        <Section>
          <FieldTitle>방문 날짜</FieldTitle>
          <FieldText>{ocrData.date}</FieldText>
        </Section>
        <Section>
          <FieldTitle>결제 금액</FieldTitle>
          <FieldText>{ocrData.amount}</FieldText>
        </Section>
      </div>

      {/* 버튼 영역 */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "2vh",
          width: "100%",
          maxWidth: "420px",
        }}
      >
        <button
          style={{
            flex: 1,
            background: "#EBF0F7",
            border: "none",
            borderRadius: "8px",
            padding: "14px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#808080",
            cursor: "pointer",
          }}
          onClick={() => navigate("/receipt/upload")}
        >
          재업로드
        </button>
        <button
          style={{
            flex: 1,
            background: "#facd2b",
            border: "none",
            borderRadius: "8px",
            padding: "14px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={() => navigate("/receipt/success")}
        >
          확인 완료
        </button>
      </div>
    </div>
  );
}

export default ReceiptConfirm;
