import styled, { keyframes } from "styled-components";

export default function ScreenLoader({ show, zIndex = 2000 }) {
  if (!show) return null;
  return (
    <Mask style={{ zIndex }}>
      <Box>
        <Spinner />
      </Box>
    </Mask>
  );
}

const spin = keyframes`to { transform: rotate(360deg); }`;

const Mask = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;
`;

const Spinner = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.7);
  border-top-color: #facd2b;
  animation: ${spin} 0.9s linear infinite;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
`;
