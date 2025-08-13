import styled, { keyframes } from "styled-components";
import { Button } from "../components/Button";

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
  margin-bottom: 5vh;
`;

// 움직이는 애니메이션
const float = keyframes`
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-7px); }
  100% { transform: translateY(0); }
`;
export const BeeImg = styled.img`
  width: 20vh;
  margin-bottom: 5vh;
  animation: ${float} 3s ease-in-out infinite;
`;

export const LoginButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2vh;
  background-color: white;
  color: #767676;
  border: 1px solid #767676;
  font-weight: 500;
  margin-bottom: 2vh;
`;
