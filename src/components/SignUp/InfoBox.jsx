// InfoBoxAnimated.jsx
import styled, { keyframes } from "styled-components";
import { MdLightbulbOutline } from "react-icons/md";

/* 살짝 위아래로 둥둥 */
const floatY = keyframes`
  0%,100% { transform: translateY(0) }
  50%     { transform: translateY(-4px) }
`;

/* 은은한 발광 */
const glow = keyframes`
  0%,100% { filter: drop-shadow(0 0 0 rgba(255,205,40,0)) }
  50%     { filter: drop-shadow(0 0 12px rgba(255,205,40,.95)) }
`;

/* 드물게 반짝 */
const flicker = keyframes`
  0%, 93%, 100% { opacity: 1 }
  94% { opacity: .65 }
  95% { opacity: 1 }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 25px 0;
  text-align: center;
`;

const BulbWrap = styled.span`
  display: inline-grid;
  place-items: center;
  width: 28px;
  height: 28px;
  animation: ${floatY} 6s ease-in-out infinite,
             ${glow} 2.6s ease-in-out infinite,
             ${flicker} 10s linear infinite;
`;

const Icon = styled(MdLightbulbOutline)`
  color: #FACD2B;
  font-size: 28px;
`;

const Text = styled.p`
  font-size: 10px;
  color: #808080;
  line-height: 1.6;
`;

export default function InfoBox() {
  return (
    <Box>
      <BulbWrap aria-hidden="true">
        <Icon />
      </BulbWrap>
      <Text>
        답변을 바탕으로 AI가 맞춤 미션을 제공해요 <br />
        답변은 나중에 변경 가능해요
      </Text>
    </Box>
  );
}