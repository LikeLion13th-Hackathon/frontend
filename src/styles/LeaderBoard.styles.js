import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  padding-bottom: 90px;
`;

export const Title = styled.h3`
  position: sticky;
  top: 0;
  z-index: 1000;

  background: #FFFFFF;
  padding: 0 0 18px;
  text-align: center;
`;

export const Item = styled.div`
  display: grid;
  grid-template-columns: 46px 48px 1fr;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: ${(props) => (props.$me ? "#FACD2B" : "#FFFFFF")};
  border-radius: 15px;
  box-shadow: 0px 2px 6px 4px rgba(212, 212, 212, 0.59);
  width: 100%;
`;

export const Rank = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: 500;
  color: #808080;
`;

export const Avatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 999px;
  overflow: hidden;
  display: grid;
  place-items: center;
  box-shadow: 0px 2px 6px 1px rgba(212, 212, 212, 0.86);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Name = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #212121;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Sub = styled.div`
  margin-top: 2px;
  font-weight: 400;
  font-size: 12px;
  color: #808080;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 18px;
`;

export const TopText = styled.div``;

export const Small = styled.p`
  font-size: 12px;
  color: #808080;
  margin: 0 0 4px;
`;

export const TopTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

export const MyRankButton = styled.button`
  font-size: 10px;
  color: #FFFFFF;
  padding: 5px 10px;
  border-radius: 20px;
  border: none;
  background: #FACD2B;
  font-weight: 700;
  margin-left: auto;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0 18px;
  margin: 0;
`;

export const ListItem = styled.li`
  margin-bottom: 12px;
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  z-index: 2000;
`;

export const ModalBox = styled.div`
  width: min(500px, 92vw);
  max-height: 80vh;
  background: #fff;
  border-radius: 15px;
  padding: 16px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 16px;
`;

export const CloseBtn = styled.button`
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
`;

export const Empty = styled.div`
  padding: 20px;
  color: #777;
  text-align: center;
`;