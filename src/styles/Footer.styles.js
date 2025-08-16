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
  background-color: rgb(243, 243, 243);
`;

export const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #888;
  min-width: 0;

  &.active {
    color: #140b77;
    font-weight: bold;
  }
`;

export const NavIcon = styled.div`
  font-size: 20px;
`;

export const NavLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
`;
