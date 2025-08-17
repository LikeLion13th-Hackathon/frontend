import styled from "styled-components";

export const NavWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  max-width: 100%;
  height: 8vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #eee;
  z-index: 999;
  background-color: #FFFFFF;

  box-shadow: 0px -5px 14px rgba(0, 0, 0, 0.1);
`;

export const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #AEAEAE;
  min-width: 0;
`;

export const NavIcon = styled.div`
  font-size: 20px;
  color: ${({ $active }) => ($active ? "#FACD2B" : "#AEAEAE")};
`;

export const NavLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
`;
