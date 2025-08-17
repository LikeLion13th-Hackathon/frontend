import styled from "styled-components";
import { MapPin } from "lucide-react";

export default function LocationBar({ location }) {
  return (
    <Wrapper>
      <MapPin size={18} color="#FACD2B" style={{ flexShrink: 0 }} />
      <Text>{location || "○○광역시 ○○구 ○○동 (사용자 위치)"}</Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f3f4f6;
  padding: 8px 30px;
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  width: 90%;
  margin: 10px auto;
`;

const Text = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #555;
  white-space: nowrap;
`;
