import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
  overflow: hidden;
  position: relative;
`;

export const DotWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const Dot = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: ${({ $active }) => ($active ? "#000000" : "#e7e323")};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5vh;
  opacity: ${(props) => (props.$show ? 1 : 0)};
  transition: opacity 0.8s ease;
  transition-delay: ${(props) => (props.$show ? "0.5s" : "0s")};
  pointer-events: ${(props) => (props.$show ? "auto" : "none")};
`;

export const SliderWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-height: 80vh;
  display: flex;
  overflow: hidden;
`;

export const SlideContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(${(props) => `-${props.$index * 100}%`});
`;
