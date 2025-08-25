import { useState, useCallback, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import TestEx from "../../assets/testEx.png";
import Slide1 from "../../assets/slides/Slide1.png";
import Slide2 from "../../assets/slides/Slide2.png";
import Slide3 from "../../assets/slides/Slide3.png";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const ModalBox = styled.div`
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 420px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 30px 16px;
  position: relative;
`;

const SliderWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const SlideContainer = styled.div`
  display: flex;
  transition: transform 0.3s ease;
  transform: translateX(${({ $index }) => `-${$index * 100}%`});
  width: 100%;
`;

const DotWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin: 0 5px;
  background: ${({ $active }) => ($active ? "#333" : "#ccc")};
`;

const CloseIcon = styled(IoClose)`
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 26px;
  color: #666;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

export default function TutorialModal({ open, onClose }) {
  const slides = [
    {
      id: 0,
      type: "text",
      content: (
        <div
          style={{
            padding: "20px",
            fontSize: "14px",
            lineHeight: "1.6",
            textAlign: "left",
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "12px" }}>
            [심사용 테스트계정 설명]
          </h3>
          <p>
            1. 본 서비스는 모바일 특화 웹앱입니다. <br />
            가급적 모바일 기기 사용을 권장드리며, PC 환경이시라면 F12 → 기기
            툴바 전환(좌측 상단) 버튼을 눌러주세요.
          </p>
          <p>
            2. PC 환경에서는 노트북 특성상 사용자 위치 정확도가 떨어집니다.
            <br />
            모바일 기기 사용을 권장드리며, 최초 이용 시 ‘권한 허용’을
            클릭해주세요!
          </p>
          <p>
            3. 테스트계정의 초기 회원가입 정보는 다음과 같습니다:
            <br />
            ‘인천 연수구 송도동 거주’, ‘카페/식당/박물관/미술관 방문 선호’,
            ‘20대 대학생’.
            <br />
            마이페이지에서 정보 조회/수정이 가능합니다.
          </p>
          <p>
            4. 원래는 최초 미션 3회 클리어 이후부터 AI가 미션을 생성하지만,
            현재는 심사 편의를 위해 2회는 완료 상태로 설정해놨습니다.
            <br />
            제공될 예시 영수증으로 미션 1회를 진행하신 뒤 새로고침하시면 해당
            흐름을 확인하실 수 있습니다.
          </p>
        </div>
      ),
    },
    { id: 1, type: "image", img: Slide1 },
    { id: 2, type: "image", img: Slide2 },
    { id: 3, type: "image", img: Slide3 },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);
  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  }, [slides.length]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  });

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [open]);

  if (!open) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()} {...swipeHandlers}>
        <CloseIcon onClick={onClose} />
        <SliderWrapper>
          <SlideContainer $index={currentSlide}>
            {slides.map((slide) => (
              <div
                key={slide.id}
                style={{
                  flex: "0 0 100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflowY: slide.type === "text" ? "auto" : "hidden",
                }}
              >
                {slide.type === "image" ? (
                  <img
                    src={slide.img}
                    alt={`slide-${slide.id}`}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  slide.content
                )}
              </div>
            ))}
          </SlideContainer>
        </SliderWrapper>
        <DotWrapper>
          {slides.map((_, i) => (
            <Dot key={i} $active={i === currentSlide} />
          ))}
        </DotWrapper>
      </ModalBox>
    </Overlay>
  );
}
