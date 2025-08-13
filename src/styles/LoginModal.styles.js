import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: hsla(0, 0%, 0%, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 3vh 4vh;
  border-radius: 16px;
  margin: 2vh;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 12px;

  input {
    padding: 2vh;
    font-size: 14px;
    border: 1px solid #767676;
    border-radius: 14px;
  }

  button {
    margin-top: 4vh;
    padding: 2vh;
    background-color: #ffcf01;
    color: #000000;
    border: none;
    border-radius: 14px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

export const ModalInput = styled.input`
  margin-bottom: 1vh;
  border-radius: 8px;
`;
