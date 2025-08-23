// 초기 페이지
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import {
  Container,
  DotWrapper,
  Dot,
  ButtonWrapper,
  SliderWrapper,
  SlideContainer,
} from "../styles/Intro.styles";
import { Button } from "../components/Button";
import Slide1 from "../assets/slides/Slide1.png";
import Slide2 from "../assets/slides/Slide2.png";
import Slide3 from "../assets/slides/Slide3.png";
import Slide4 from "../assets/slides/Slide4.png";

function Home() {
  // 페이지 이동 관리
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };

  // 사진 목록
  const slides = [
    { id: 1, img: Slide1 },
    { id: 2, img: Slide2 },
    { id: 3, img: Slide3 },
    { id: 4, img: Slide4 },
  ];

  // 슬라이드 관리
  const [currentSlide, setCurrentSlide] = useState(0);
  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);
  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  }, [slides.length]);

  // 터치로 슬라이드 넘기기
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  });

  return (
    <Container {...swipeHandlers}>
      <SliderWrapper>
        <SlideContainer $index={currentSlide}>
          {slides.map((slide) => (
            <div
              key={slide.id}
              style={{
                flex: "0 0 100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={slide.img}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  maxHeight: "70vh",
                }}
              />
            </div>
          ))}
        </SlideContainer>
      </SliderWrapper>

      <DotWrapper>
        {slides.map((_, i) => (
          <Dot key={i} $active={i === currentSlide} />
        ))}
      </DotWrapper>

      <ButtonWrapper $show={currentSlide === slides.length - 1}>
        <Button onClick={handleClick}>시작하기</Button>
      </ButtonWrapper>
    </Container>
  );
}

export default Home;
