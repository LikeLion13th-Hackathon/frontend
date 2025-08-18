// 공통 하단바
import { useNavigate, useLocation } from "react-router-dom";
import {
  NavWrapper,
  NavItem,
  NavIcon,
  NavLabel,
} from "../styles/Footer.styles";
import { ReactComponent as MainIcon } from "../assets/icons/Footer/mainpage.svg";
import { ReactComponent as MissionIcon } from "../assets/icons/Footer/mission.svg";
import { ReactComponent as ShopIcon } from "../assets/icons/Footer/shop.svg";
import { ReactComponent as LeaderboardIcon } from "../assets/icons/Footer/leaderboard.svg";
import { ReactComponent as MyPageIcon } from "../assets/icons/Footer/mypage.svg";

const menuList = [
  { Icon: MainIcon, label: "홈", path: "/mainpage" },
  { Icon: MissionIcon, label: "미션", path: "/mission" },
  { Icon: ShopIcon, label: "상점", path: "/shop" },
  { Icon: LeaderboardIcon, label: "랭킹", path: "/leaderboard" },
  { Icon: MyPageIcon, label: "마이", path: "/mypage" },
];

function Footer({ activeLabel }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <NavWrapper>
      {menuList.map(({ Icon, label, path }) => {
        const isActive = activeLabel === label || location.pathname === path;

        return (
          <NavItem
            key={path}
            onClick={() => navigate(path)}
            className={isActive ? "active" : ""}
          >
            <NavIcon $active={isActive}>
              <Icon aria-hidden />
            </NavIcon>
            <NavLabel $active={isActive}>{label}</NavLabel>
          </NavItem>
        );
      })}
    </NavWrapper>
  );
}

export default Footer;
