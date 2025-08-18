import styled from "styled-components";
import { Button } from "../components/Button";

export const Wrapper = styled.div`
  margin: 0px auto;
  width: 100%;
  padding: 4vw;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-bottom: 100px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 4vh;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6vh;
`;

export const Label = styled.label`
  font-weight: bold;
  font-size: 16px;
`;

export const Required = styled.span`
  color: red;
  margin-left: 4px;
  font-size: 16px;
`;

export const Input = styled.input`
  flex: 1;
  height: 40px;
  padding: 0 20px;
  font-size: 12px;
  border-radius: 14px;
  border: 1px solid #767676;
  &::placeholder {
    color: #aeaeae;
  }
`;

export const Select = styled.select`
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  box-sizing: border-box;

  font-size: 12px;
  color: #aeaeae;

  border-radius: 14px;
  border: 1px solid #767676;

  flex: 1 1 0;
  min-width: 0;
  width: 100%;

  background-color: white;

  &:valid {
    color: #000;
  }
  &:disabled {
    opacity: 1;
    -webkit-text-fill-color: #aeaeae;
    border: 1px solid #767676;
    cursor: not-allowed;
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  width: 100%;
`;

export const SubmitButton = styled(Button)`
  position: fixed;
  bottom: 4vh;
  left: 50%;
  transform: translateX(-50%);
  width: 90vw;
  padding: 16px;
  color: white;
  z-index: 1000;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 2px;
  margin-top: 5px;
`;

export const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 14px;
  cursor: pointer;

  input[type="radio"] {
    appearance: none;
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border: 1px solid #767676;
    border-radius: 50%;
  }

  input[type="radio"]:checked {
    border: 5px solid #facd2b;
  }
`;

export const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 5px;
`;

export const CheckboxOption = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;

  input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border: 1px solid #ccc;
    border-radius: 3px;
    position: relative;
  }

  input[type="checkbox"]:checked::after {
    content: "";
    position: absolute;
    top: 2px;
    left: 5px;
    width: 4px;
    height: 8px;
    border: solid #facd2b;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  input[type="checkbox"]:disabled {
    background-color: #f5f5f5;
    border-color: #ddd;
    cursor: not-allowed;
  }
`;

export const LabelRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const LimitBadge = styled.span`
  font-size: 10px;
  color: #555;
  background: #f4f6fb;
  padding: 2px 8px;
  margin-left: 8px;
  margin-top: 4px;
  border-radius: 500px;
`;
