import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../styles/MyPage.styles";
import { UploadBox } from "./ReceiptUpload";
import { getReceiptFile } from "../../api/receipt";
import {
  Section,
  FieldTitle,
  FieldText,
} from "../../styles/MissionDetail.styles";

function ReceiptConfirm() {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state; // OCR 결과
  const [imageUrl, setImageUrl] = useState(null);
  const address =
    result.storeAddressFull ||
    [result.storeAddressSiDo, result.storeAddressGuGun, result.storeAddressDong]
      .filter(Boolean)
      .join(" ") ||
    "주소 없음";

  // 이미지 불러오기
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const blob = await getReceiptFile(result.missionId, result.receiptId);
        const url = URL.createObjectURL(blob);
        setImageUrl(url);

        // 컴포넌트 언마운트 시 메모리 정리
        return () => URL.revokeObjectURL(url);
      } catch (err) {
        console.error("영수증 이미지 불러오기 실패:", err);
      }
    };
    fetchImage();
  }, [result.missionId, result.receiptId]);

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
        {imageUrl && (
          <img
            src={imageUrl}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            alt="영수증"
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
          <FieldTitle>{result.storeName}</FieldTitle>
          <FieldText>{address}</FieldText>
        </Section>
        <Section>
          <FieldTitle>방문 날짜</FieldTitle>
          <FieldText>
            {result.purchaseAt
              ? new Date(result.purchaseAt).toLocaleString()
              : "날짜 없음"}
          </FieldText>
        </Section>
        <Section>
          <FieldTitle>결제 금액</FieldTitle>
          <FieldText>{result.amount?.toLocaleString()}원</FieldText>
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
          onClick={() => navigate(`/receipt/upload/${result.missionId}`)}
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
          onClick={() =>
            navigate("/receipt/success", {
              state: {
                missionId: result.missionId,
                receiptId: result.receiptId,
              },
            })
          }
        >
          확인 완료
        </button>
      </div>
    </div>
  );
}

export default ReceiptConfirm;
