import { useState, useCallback, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
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
    { id: 1, img: Slide1 },
    { id: 2, img: Slide2 },
    { id: 3, img: Slide3 },
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
                }}
              >
                <img
                  src={slide.img}
                  alt={`slide-${slide.id}`}
                  style={{
                    maxWidth: "90%",
                    maxHeight: "90%",
                    objectFit: "contain",
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
      </ModalBox>
    </Overlay>
  );
}
