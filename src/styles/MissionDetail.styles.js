import styled from "styled-components";

export const Container = styled.div`
  padding-top: 1vh;
  display: flex;
  flex-direction: column;
  align-items: center; /* 가운데 정렬 */
  gap: 12px;
  width: 100%;
`;

export const Card = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
  aspect-ratio: 2 / 2.25;
  margin-bottom: 1vh;
  padding: 2vh;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

// 뱃지 & 타이틀 영역
export const TagRow = styled.div`
  width: 100%;
  max-width: 420px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TagGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid #e5e7eb;
`;

export const Title = styled.h3`
  width: 100%;
  max-width: 420px;
  margin: 1.5vh 0 0;
  font-size: 17px;
  font-weight: 500;
  line-height: 1.4;
`;

// 구분선
export const Divider = styled.hr`
  width: 100%;
  max-width: 420px;
  border: 0;
  border-top: 1px solid #edf0f4;
  margin: 2vh 0;
`;

// 지도 영역
export const LocationPill = styled.div`
  background-color: #efefef;
  padding: 8px;
  border-radius: 999px;
  box-shadow: 0 0px 6px rgba(0, 0, 0, 0.1);
  font-size: 12px;
  font-weight: 500;
  z-index: 2;
`;

export const LocEm = styled.span`
  color: #ff4d8d;
`;

export const MapBox = styled.div`
  width: 100%;
  max-width: 420px;
  height: 200px;
  margin-bottom: 3vh;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  background: #dfe7ef;
`;

// 설명글 영역
export const Section = styled.section`
  width: 100%;
  max-width: 420px;
  margin-bottom: 1vh;
`;

export const FieldTitle = styled.div`
  font-size: 14px;
  font-weight: 800;
  color: #111827;
`;

export const FieldText = styled.div`
  color: #79797b;
  font-size: 12px;
  line-height: 1.6;
  white-space: pre-line;
`;
