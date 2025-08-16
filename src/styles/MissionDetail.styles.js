import styled from "styled-components";

export const Container = styled.div`
  padding-top: 2vh;
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
  aspect-ratio: 2 / 2.5;
  margin-bottom: 8vh;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

/* ── 1) 뱃지/타이틀 */
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
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  background: ${({ $variant }) =>
    $variant === "primary" ? "#FFF3C4" : "#EEF1F5"};
  color: ${({ $variant }) => ($variant === "primary" ? "#6B4A00" : "#374151")};
  border: ${({ $variant }) =>
    $variant === "primary" ? "0" : "1px solid #E5E7EB"};
`;

export const Title = styled.h3`
  width: 100%;
  max-width: 420px;
  margin: 4px 0 0;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.4;
`;

export const Divider = styled.hr`
  width: 100%;
  max-width: 420px;
  border: 0;
  border-top: 1px solid #edf0f4;
  margin: 10px 0;
`;

/* ── 2) 지도 오버레이(내 위치/마커) */
export const LocationPill = styled.div`
  position: absolute;
  left: 12px;
  top: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #fff;
  border-radius: 999px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  font-size: 12px;
  font-weight: 700;
  z-index: 2;
`;

export const LocEm = styled.span`
  color: #ff4d8d;
`;

export const ChangeLink = styled.button`
  margin-left: 6px;
  border: 0;
  background: none;
  color: #6b7280;
  font-weight: 700;
  cursor: pointer;
`;

export const Marker = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 56px;
  z-index: 1;
`;

/* ── 3) 설명글 */
export const Section = styled.section`
  width: 100%;
  max-width: 420px;
`;

export const FieldTitle = styled.div`
  font-size: 14px;
  font-weight: 800;
  color: #111827;
`;

export const FieldText = styled.div`
  margin-top: 6px;
  color: #4b5563;
  line-height: 1.6;
  white-space: pre-line;
`;
