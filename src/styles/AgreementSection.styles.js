import styled from "styled-components";

export const Container = styled.div`
  border-bottom: 1px solid #eee;
  padding: 12px 0;
`;

export const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const CheckBox = styled.div`
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LabelArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  gap: 4px;
`;

export const Required = styled.span`
  color: red;
  font-size: 14px;
`;

export const Content = styled.div`
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  padding-top: 8px;
`;

export const ToggleText = styled.span`
  font-size: 11px;
  color: #B6B6B6;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AgreementWrapper = styled.div`
  margin: 40px 0;
  display: flex;
  flex-direction: column;
`;

export const AgreementBody = styled.div`
  padding: 12px;
  font-size: 13px;
  color: #555;
  line-height: 1.5;
  overflow: hidden; // 애니메이션 부드럽게
`;