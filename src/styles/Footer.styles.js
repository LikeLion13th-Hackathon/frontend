import styled from "styled-components";

export const NavWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  max-width: 100%;
  height: 7.5vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #eee;
  z-index: 999;
  background-color: #ffffff;
  box-shadow: 0 -2px 14.1px rgba(0, 0, 0, 0.1);
`;

export const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #aeaeae;
  min-width: 0;
`;

export const NavIcon = styled.div`
  font-size: 12px;
  color: ${({ $active }) => ($active ? "#FACD2B" : "#AEAEAE")};
`;

export const NavLabel = styled.span`
  font-size: 9px;
  font-weight: 600;
  color: ${({ $active }) => ($active ? "#FACD2B" : "#AEAEAE")};
`;
