// 메인페이지 헤더
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Coin from "../../assets/icons/coin.png";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FiHelpCircle } from "react-icons/fi";
import Setting from "../../assets/icons/setting.png";
import MainLogo from "../../assets/logo/MainLogoHeight.png";

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7vh;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Welcome = styled.h2`
  margin: 1vh;
`;

export default function MainPageHeader({ coins, userName, onHelpClick }) {
  const navigate = useNavigate();
  return (
    <>
      <img src={MainLogo} style={{ width: "24vh", marginTop: "2vh" }} />

      <Header>
        {/* 왼쪽: 코인 */}
        <Row style={{ gap: "4px" }}>
          <img src={Coin} width={22} style={{ marginTop: "2px" }} alt="coin" />
          <span style={{ fontWeight: 700, fontSize: 16 }}>{coins}</span>
        </Row>

        {/* 오른쪽: 도움말, 통계, 설정 */}
        <Row>
          <FiHelpCircle
            size={22}
            style={{ color: "#BFBFBF", cursor: "pointer" }}
            onClick={onHelpClick}
          />

          <TbBrandGoogleAnalytics
            size={22}
            style={{ color: "#BFBFBF", cursor: "pointer" }}
            onClick={() => navigate("/stats")}
          />

          <img
            src={Setting}
            width={22}
            style={{ cursor: "pointer" }}
            alt="setting"
            onClick={() => navigate("/mypage")}
          />
        </Row>
      </Header>
      <Welcome>{userName}님, 반가워요!</Welcome>
    </>
  );
}
