// 공통 하단바
import { useNavigate, useLocation } from "react-router-dom";
import {
  NavWrapper,
  NavItem,
  NavIcon,
  NavLabel,
} from "../styles/Footer.styles";
import HomeOn from "../assets/icons/Icon.png";
import HomeOff from "../assets/icons/Icon.png";
import GpaOn from "../assets/icons/Icon.png";
import GpaOff from "../assets/icons/Icon.png";
import GradOn from "../assets/icons/Icon.png";
import GradOff from "../assets/icons/Icon.png";
import PlanOn from "../assets/icons/Icon.png";
import PlanOff from "../assets/icons/Icon.png";
import MyOn from "../assets/icons/Icon.png";
import MyOff from "../assets/icons/Icon.png";

const menuList = [
  { iconOn: HomeOn, iconOff: HomeOff, label: "홈", path: "/mainpage" },
  { iconOn: GpaOn, iconOff: GpaOff, label: "미션", path: "/mission" },
  { iconOn: GradOn, iconOff: GradOff, label: "상점", path: "/shop" },
  { iconOn: PlanOn, iconOff: PlanOff, label: "리더보드", path: "/leaderboard" },
  { iconOn: MyOn, iconOff: MyOff, label: "마이", path: "/mypage" },
];

function Footer({ activeLabel }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <NavWrapper>
      {menuList.map((menu) => {
        const isActive =
          activeLabel === menu.label || location.pathname === menu.path;

        return (
          <NavItem
            key={menu.path}
            onClick={() => navigate(menu.path)}
            className={isActive ? "active" : ""}
          >
            <NavIcon>
              <img
                src={isActive ? menu.iconOn : menu.iconOff}
                style={{
                  width: "3vh",
                  height: "3vh",
                  objectFit: "contain",
                }}
              />
            </NavIcon>
            <NavLabel>{menu.label}</NavLabel>
          </NavItem>
        );
      })}
    </NavWrapper>
  );
}

export default Footer;
