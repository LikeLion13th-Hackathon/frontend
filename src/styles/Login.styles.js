import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
  overflow: hidden;
`;

export const TitleSmall = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #767676;
  margin-top: 1vh;
  margin-bottom: 4vh;
`;

export const Input = styled.input`
  width: 80vw;
  max-width: 360px;
  height: 7vh;
  padding: 2vh;
  font-size: 14px;
  border: 1.2px solid #767676;
  border-radius: 6px;
  cursor: pointer;
  box-sizing: border-box;
  margin-bottom: 1vh;
`;

export const SignUpLink = styled(Link)`
  color: #767676;
  font-size: 14px;
  margin-top: 3.5vh;
`;

// 움직이는 애니메이션 (캐릭터)
const float = keyframes`
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-7px); }
  100% { transform: translateY(0); }
`;
export const BbiImg = styled.img`
  width: 18vh;
  margin-bottom: 4vh;
  animation: ${float} 3s ease-in-out infinite;
`;
