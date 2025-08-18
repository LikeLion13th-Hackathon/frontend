// 메인페이지
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Page } from "../styles/MainPage.styles";
import MainPageHeader from "../components/MainPage/MainPageHeader";
import CharacterCard from "../components/MainPage/CharacterCard";
import BbiBasic from "../assets/characters/bbi_basic.png";
import BgEx from "../assets/backgrounds/BackgroundEx.png";
import MissionList from "../components/MainPage/MissionList";
import Restaurant from "../assets/backgrounds/Restaurant.png";
import Park from "../assets/backgrounds/Park.png";
import Footer from "../components/Footer";

function MainPage() {
  const navigate = useNavigate();

  // 토큰 없으면 로그인 페이지로 리다이렉션
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token || token === "null" || token.trim() === "") {
  //     navigate("/login");
  //     toast.warn("로그인이 필요합니다.", { autoClose: 2000 });
  //   }
  // }, [navigate]);

  // 미션 더미데이터 (나중에 API로 교체)
  const [missions, setMissions] = useState([
    {
      id: "1",
      category: "맞춤미션",
      image: Restaurant,
      title: "00동 음식점에서 7000원 이상 결제하기",
      points: 100,
    },
    {
      id: "2",
      category: "지역명소",
      image: Park,
      title: "ㅁㅁ구 박물관 방문하기",
      points: 300,
    },
    {
      id: "3",
      category: "기타",
      image: Park,
      title: "기타 기타 기타",
      points: 500,
    },
  ]);

  return (
    <>
      <Container>
        <MainPageHeader />
        <Page>
          <CharacterCard
            bg={`url(${BgEx})`}
            levelText="Level 3"
            name="삐약이"
            progress={87.2}
            characterSrc={BbiBasic}
            onClick={() => navigate("/shop")}
          />
        </Page>

        <h2 style={{ fontSize: "18px", margin: "18px 6px 10px" }}>
          오늘의 미션
        </h2>
        <MissionList
          items={missions}
          onClick={(id) => navigate(`/mission/${id}`)}
        />
      </Container>
      <Footer />
    </>
  );
}

export default MainPage;
