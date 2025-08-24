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

  background: ${({ $active, $category }) => {
    if (!$active) return "#f3f4f6";

    switch ($category) {
      case "식당":
        return "#ff6b6b"; // 빨강
      case "카페":
        return "#4dabf7"; // 파랑
      case "박물관/미술관":
        return "#9775fa"; // 보라
      case "특산품":
        return "#51cf66"; // 초록
      case "AI":
        return "#f59f00"; // 주황
      default:
        return "#facd2b"; // 전체 or 기타
    }
  }};

  color: ${({ $active }) => ($active ? "#fff" : "#333")};
  box-shadow: ${(p) => (p.$active ? "0 4px 6px rgba(0,0,0,0.2)" : "none")};

  &:hover {
    background: ${({ $active, $category }) => {
      if (!$active) return "#e5e7eb";

      switch ($category) {
        case "지역명소":
          return "#F0702F";
        case "지역맛집":
          return "#9FC136";
        case "특산품":
          return "#FE98B6";
        case "기타":
          return "#565253ff";
        default:
          return "#FACD2B";
      }
    }};
  }
`;
