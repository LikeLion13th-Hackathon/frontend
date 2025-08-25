import styled from "styled-components";

// 상점 탭바 스타일
export const TabsBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;

  background: #FFFFFF;
  border-radius: 0 0 20px 20px;
  padding: 0 16px;
  box-shadow: 0 4px 8px -2px rgba(0,0,0,0.15);
`;

export const Title = styled.h3`
  margin-bottom: 0.6rem;
  text-align: center;
  background: #FFFFFF;
  font-weight: 800;
`;

export const Tab = styled.button`
  font-weight: 700;
  font-size: 14px;

  color: ${({ $active }) => ($active ? "#111111" : "#AEAEAE")};
  border: none;
  background: none;
`;

export const Track = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 50px;
`;

export const Underline = styled.div`
  position: absolute;
  bottom: 0;
  height: 2px;
  background: #FACD2B;
  border-radius: 999px;

  width: 30%;
  left: ${({ $index }) => `calc(${25 + $index * 50}% )`};
  transform: translateX(-50%);
  transition: left 180ms ease;
`;


// 코인 배지 스타일
export const Badge = styled.div`
  position: absolute;
  top: 100px;
  left: 0;     
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  margin: 14px 0 0 22px;

  background: #FFFFFF;
  border-radius: 50px;
  font-weight: 700;
  color: #111111;

  box-shadow: 0px 2px 6px 1px rgba(212, 212, 212, 0.59);
`;

export const CoinIcon = styled.span`
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  color: #FACD2B;
`;

export const Amount = styled.span`
  font-size: 14px;
  padding: 0 5px;
  line-height: 1;
  transform: translateY(-1px)
`;


// 캐릭터 카드 스타일
export const CharacterWrapper = styled.div`
  position: relative;
  min-height: clamp(360px, 60vh, 640px);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CharacterStage = styled.section`
  position: relative;
  margin: ${({ $variant }) => ($variant === "grow" ? "8px 0 0" : "4px 0 0")};
`;

export const CharacterStageInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ $variant }) => ($variant === "grow" ? "16px 0 20px" : "8px 0 12px")};
  transition: filter .2s ease, transform .2s ease, box-shadow .2s ease;
  ${({ $glow }) =>
    $glow &&
    `
    filter: drop-shadow(0 0 16px rgba(255,255,255,0.8));
    `}
`;

export const CharacterImg = styled.img`
  width: clamp(140px, 40vw, 230px);
  height: auto;
  display: block;
`;

export const CharNameRow = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: clamp(0.25rem, 1.5vw, 0.5rem); 
  margin: clamp(0.5rem, 2vw, 0.75rem) 0;
  transform: translateX(0.125rem);
`;

export const CharName = styled.span`
  display: block;
  margin: 0;
  font-size: clamp(1rem, 4vw, 1.25rem);
  font-weight: 800;
  text-align: center;
  color: #111111;
`;

export const EditBtn = styled.button`
  background: none;
  border: none;
  padding: 6px; 
  margin: -4px;  

  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: #AEAEAE; 
`;

export const LevelBadge = styled.span`
  display: inline-block;
  padding: clamp(0.15rem, 0.6vw, 0.25rem) clamp(0.8rem, 4vw, 1rem); 
  border-radius: 20px;
  background: #FACD2B;
  color: #FFFFFF;
  font-weight: 800;
  font-size: clamp(0.65rem, 2.5vw, 0.75rem);
  box-shadow: 0 0.2rem 0.15rem rgba(0, 0, 0, 0.15);
`;

export const Page = styled.div`
  position: relative;
  min-height: 100dvh;
  padding-bottom: env(safe-area-inset-bottom);
  display: flex; 
  flex-direction: column;
  background: transparent;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Divider = styled.div`
  width: 100%;
  height: 0.5px;
  background: #DBDBDB;
  margin: 10px 0;
`;