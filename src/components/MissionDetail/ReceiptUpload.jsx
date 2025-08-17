// 영수증 업로드 페이지
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, BackIcon } from "../../styles/MyPage.styles";
import Footer from "../Footer";
import ReceiptEx from "../../assets/icons/ReceiptEx.png";

// 스타일
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1vh;
`;

export const InfoText = styled.p`
  font-size: 13px;
  color: #79797b;
  text-align: center;
`;

export const UploadBox = styled.div`
  width: 100%;
  max-width: 400px;
  height: 320px;
  border: 2px dashed #e5e5e5;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  text-align: center;
  color: #999;
  cursor: pointer;
  transition: border-color 0.2s ease-in-out;

  &:hover {
    border-color: #f7c948;
  }

  p {
    margin-top: 12px;
    font-size: 0.9rem;
    color: #79797b;
  }
`;

export const UploadButton = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin: 0 auto;
  background-color: #facd2b74;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: #facd2b;
  transition: background 0.2s ease-in-out;

  &:hover {
    background-color: #e5bf373a;
  }
`;

// 모달창 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 2vh;
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

function ReceiptUpload() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <div style={{ padding: "2vh", paddingTop: "1vh" }}>
      <Header>
        <BackIcon size={20} onClick={() => navigate(-1)} />
        <h3>영수증 인증</h3>
      </Header>

      <Container>
        <h3 style={{ marginBottom: "1vh" }}>영수증 사진을 업로드해주세요.</h3>
        <InfoText>
          필수 정보(업체명, 전화번호, 결제 일시, 결제 금액 등)가 <br /> 잘
          나오도록 촬영하여 업로드해주세요.
        </InfoText>

        <div
          style={{
            fontSize: "14px",
            color: "#AEAEAE",
            cursor: "pointer",
            marginBottom: "4vh",
            textDecorationLine: "underline",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          영수증 예시 보기
        </div>

        {/* 업로드 전/후 */}
        {!previewUrl ? (
          <UploadBox>
            <label htmlFor="receipt-upload" style={{ cursor: "pointer" }}>
              <UploadButton>+</UploadButton>
              <p>버튼을 눌러 사진을 추가해주세요.</p>
            </label>
            <input
              id="receipt-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
          </UploadBox>
        ) : (
          <div style={{ width: "100%", maxWidth: "400px" }}>
            <img
              src={previewUrl}
              style={{
                width: "100%",
                height: "320px",
                borderRadius: "12px",
                marginBottom: "16px",
                objectFit: "cover",
              }}
            />

            <div style={{ display: "flex", gap: "12px" }}>
              {/* 재업로드 버튼 */}
              <button
                style={{
                  flex: 1,
                  color: "#808080",
                  background: "#EBF0F7",
                  border: "none",
                  borderRadius: "6px",
                  padding: "14px",
                  fontSize: "15px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => setPreviewUrl(null)}
              >
                재업로드
              </button>

              {/* 스캔 버튼 */}
              <button
                style={{
                  flex: 1,
                  color: "#FFFFFF",
                  background: "#facd2b",
                  border: "none",
                  borderRadius: "6px",
                  padding: "14px",
                  fontSize: "15px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => {
                  // 스캔 페이지로 이동
                  navigate("/receipt/scanning", {
                    state: { image: previewUrl },
                  });
                }}
              >
                영수증 스캔
              </button>
            </div>
          </div>
        )}
      </Container>

      {/* 모달 */}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <Header>
              <BackIcon size={20} onClick={() => setIsModalOpen(false)} />
              <h4>영수증 예시</h4>
            </Header>
            <img src={ReceiptEx} style={{ width: "70%" }} alt="영수증 예시" />
            <p style={{ fontSize: "15px", color: "#808080" }}>
              깨끗한 배경에 영수증을 놓고 <br /> 전체가 잘 나오도록
              촬영해주세요.
            </p>
            <p style={{ fontSize: "11px", color: "#808080", marginTop: "8px" }}>
              ℹ️ 필수 정보가 부족하다면 인식에 실패할 수 있습니다.
            </p>
          </ModalContent>
        </ModalOverlay>
      )}

      <Footer />
    </div>
  );
}

export default ReceiptUpload;
