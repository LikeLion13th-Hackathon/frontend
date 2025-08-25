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
  margin-top: 2vh;
  margin-bottom: 2vh;
`;

export const Dot = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: ${({ $active }) => ($active ? "#1e0066" : "#ccc")};
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.$show ? 1 : 0)};
  transition: opacity 0.8s ease;
  transition-delay: ${(props) => (props.$show ? "0.5s" : "0s")};
  pointer-events: ${(props) => (props.$show ? "auto" : "none")};
`;

export const SliderWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const SlideContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(${(props) => `-${props.$index * 100}%`});
`;
