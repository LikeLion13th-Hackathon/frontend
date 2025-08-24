// 메인페이지 헤더
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Coin from "../../assets/icons/coin.png";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import Setting from "../../assets/icons/setting.png";

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1vh;
  height: 7vh;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Welcome = styled.h2`
  margin: 1vh;
`;

export default function MainPageHeader({ coins, userName }) {
  const navigate = useNavigate();
  return (
    <>
      <Header>
        <Row>
          <img src={Coin} width={22} style={{ marginTop: "2px" }} />
          <span style={{ fontWeight: 700, fontSize: 16 }}>{coins}</span>
        </Row>
        {/* 나중에 통계 페이지 만들거면 <TbBrandGoogleAnalytics /> */}
        <img
          src={Setting}
          width={22}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/mypage")}
        />
      </Header>
      <Welcome>{userName}님, 반가워요!</Welcome>
    </>
  );
}
