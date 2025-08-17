import styled from "styled-components";

export const CategoryTabs = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 16px;

  /* 가로 스크롤 숨김 (모바일 UX) */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CategoryButton = styled.button`
  padding: 6px 14px;
  border-radius: 16px;
  border: none;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  background: ${(p) => (p.$active ? "#facd2b" : "#f3f4f6")};
  color: ${(p) => (p.$active ? "#fff" : "#333")};
  box-shadow: ${(p) => (p.$active ? "0 4px 6px rgba(0,0,0,0.2)" : "none")};

  &:hover {
    background: ${(p) => (p.$active ? "#f9c400" : "#e5e7eb")};
  }
`;
