import styled from "styled-components";

export const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 28px;
`;

export const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ $active }) => ($active ? "#FACD2B" : "#EDEFF2")};
`;

export const Line = styled.div`
  width: 35px;
  height: 2px;
  background-color: #E5E8EB
`;


export default function StepBar({ step }) {
  return (
    <Bar>
      <Circle $active={step === 1} />
      <Line/>
      <Circle $active={step === 2} />
    </Bar>
  );
}