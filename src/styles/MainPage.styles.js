import styled from "styled-components";

export const Container = styled.div`
  padding: 2vh;
  padding-top: 0;

  // 스크롤 관련
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: calc(88px + env(safe-area-inset-bottom));
  flex: 1;
`;

export const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
