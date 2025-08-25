// 공통 스타일
import styled from "styled-components";

export const Container = styled.div`
  padding: 2vh;
`;

export const Header = styled.div`
  padding: 1vh 0;
  border-bottom: 1px solid #eee;
  h3 {
    margin: 0;
  }
`;

export const Section = styled.div`
  margin-top: 2vh;
`;

export const SectionTitle = styled.h4`
  margin-bottom: 1vh;
`;

export const MissionCard = styled.div`
  padding: 1.5vh;
  margin-bottom: 1vh;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fafafa;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const MissionTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

export const MissionStatus = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 4px;
`;
