// 회원가입 완료 페이지
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import bbiStep2 from "../assets/characters/bbiStep3.png";

export const Container = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TitleSmall = styled.p`
  margin-top: 2vh;
  margin-bottom: 12vh;
  font-size: 20px;
  font-weight: 600;
  color: #000;
`;

export const TitleMain = styled.h1`
  font-size: 60px;
  font-weight: 900;
  text-align: center;
  color: #ffcf01;
  white-space: pre-line;
  margin-bottom: 0vh;
`;

export default function SignupComplete() {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <Container>
      <img src={bbiStep2} style={{ width: "35%" }} />
      <div style={{ color: "#767676" }}>그냥 사는 대로, 쌓이는 재미</div>
      <TitleSmall>회원가입이 완료되었어요!</TitleSmall>
      <Button onClick={handleLoginClick} style={{ marginBottom: "1.5vh" }}>
        로그인
      </Button>
      <Button
        onClick={handleHomeClick}
        style={{
          backgroundColor: "white",
          color: "#767676",
          border: "1px solid #767676",
        }}
      >
        홈 화면으로
      </Button>
    </Container>
  );
}
