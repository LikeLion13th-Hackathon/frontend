// 공통 버튼
import styled from "styled-components";

export const Button = styled.button`
  width: 75vw;
  max-width: 360px;
  height: 7vh;
  background-color: #ffcf01;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  padding: 1vh;
  box-sizing: border-box;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:active {
    opacity: 0.5;
  }

  &:disabled {
    background-color: #ebf0f7;
    cursor: not-allowed;
  }
`;
