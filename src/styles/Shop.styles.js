import styled from "styled-components";

// 상점 탭 스타일
export const TabsBar = styled.div`
  background: #FFFFFF;
  border-radius: 0 0 20px 20px;
  padding: 0 16px;
  box-shadow: 0 4px 8px -2px rgba(0,0,0,0.15);
`;

export const Title = styled.h3`
  margin-bottom: 0.6rem;
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

  width: 100px;
  left: ${({ $index }) => `calc(${25 + $index * 50}% )`};
  transform: translateX(-50%);
  transition: left 180ms ease;
`;


// 코인 배지 스타일
export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  margin: 14px 0 0 22px;

  background: #FFFFFF;
  border-radius: 50px;
  font-weight: 700;
  color: #111111;
  line-height: 1;

  box-shadow: 0px 2px 6px 1px rgba(212, 212, 212, 0.59);
`;

export const CoinIcon = styled.span`
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
`;

export const Amount = styled.span`
  font-size: 14px;
  padding: 0 5px;
  line-height: 1;
  transform: translateY(-1px)
`;


// 캐릭터 카드 스타일
export const CharacterStage = styled.section`
  margin-top: clamp(0.5rem, 3vw, 0.75rem); 
  position: relative;
`;

export const CharacterStageInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: clamp(0.75rem, 4vw, 1rem) 0 clamp(1rem, 5vw, 1.25rem);
`;

export const CharacterImg = styled.img`
  width: clamp(160px, 60vw, 230px);
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

export const CharLevel = styled.span`
  display: inline-block;
  padding: clamp(0.15rem, 0.6vw, 0.25rem) clamp(0.8rem, 4vw, 1rem); 
  border-radius: 20px;
  background: #FACD2B;
  color: #FFFFFF;
  font-weight: 800;
  font-size: clamp(0.65rem, 2.5vw, 0.75rem);
  box-shadow: 0 0.2rem 0.15rem rgba(0, 0, 0, 0.15);
`;


// 캐릭터 키우기 탭
export const GrowPanel = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  padding-bottom: env(safe-area-inset-bottom, 0);
`;

export const GrowBox = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: calc(7.5vh + env(safe-area-inset-bottom, 0));
  
  padding: 2vw;
  margin: 0 4vw;
  border-radius: 20px 20px 0 0;
  background: #fff;
  box-shadow: 0 2px 6px 4px rgba(212, 212, 212, 0.59);
  z-index: 998;
`;

export const LevelBlock = styled.div`
  display: flex;
  gap: 4vw;
  align-items: flex-start;
  width: 100%;
  padding: 2vw;
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

export const XPSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%; 
`;

export const XPHeader = styled.div`
  display: flex;
  align-items: baseline;
  flex: 1;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const XPTitles = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
  flex: 1;  
`;

export const LevelEm = styled.span`
  font-size: clamp(0.9rem, 3vw, 1rem);
  color: #FACD2B;
  font-weight: 700;
`;

export const XPName = styled.span`
  font-size: clamp(0.8rem, 3vw, 0.9rem);
  color: #111111;
  font-weight: 700;
`;

export const XPPercent = styled.span`
  font-size: clamp(0.65rem, 2vw, 0.7rem);
  color: #808080;
  font-weight: 600;
`;

export const XPBar = styled.div`
  width: 100%;  
  height: 0.8rem;
  background: #EBF0F7;
  border-radius: 20px;
  margin: 0.5rem 0;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0.2rem 0.15rem rgba(0,0,0,0.15);
  flex-shrink: 0;  
`;

export const XPFill = styled.div`
  display: block; 
  height: 100%;
  width: ${({ $value }) => `${$value}%`};
  background: #FACD2B;
  border-radius: inherit;
  transition: width 200ms ease;
  will-change: width; 
`;

export const XPSub = styled.div`
  font-size: clamp(0.65rem, 2.5vw, 0.8rem);
  color: #AEAEAE;
  font-weight: 500;
`;

export const Divider = styled.div`
  width: 100%;
  height: 0.5px;
  background: #DBDBDB;
  margin: 10px 0;
`;

// 캐릭터 키우기 탭 액션
export const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 0.6rem 0.4rem;
`;

export const ActionCard = styled.button`
  border: none;
  outline: none;
  -webkit-appearance: none;
  background-color: #FFFFFF;

  border-radius: 18px;
  background: #FFFFFF;
  box-shadow: 0 0.2rem 0.4rem rgba(212, 212, 212, 0.86);
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  transition: background 0.2s ease, transform 0.2s ease;

  &:active {
    background: #EBF0F7;
    transform: scale(0.98);
  }
`;

export const ActionIcon = styled.div`
  font-size: clamp(1.8rem, 8vw, 2.5rem);
  line-height: 1;
  margin-bottom: clamp(0.4rem, 1.5vw, 0.6rem);
`;

export const ActionTitle = styled.div`
  font-size: clamp(0.7rem, 2.5vw, 0.9rem);
  font-weight: 500;
  color: #111111;
`;

export const ActionBadge = styled.div`
  min-width: clamp(3.5rem, 20vw, 5rem); 
  height: clamp(1.2rem, 4vw, 1.5rem); 

  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center; 
  gap: 6px;

  margin-top: clamp(0.4rem, 1.5vw, 0.6rem);
  padding: clamp(0.3rem, 1vw, 0.5rem) clamp(0.8rem, 3vw, 1.2rem);
  border-radius: 20px;
  background: #FACD2B;
  color: #FFFFFF;
  font-size: clamp(0.65rem, 2vw, 0.75rem);
  font-weight: 800;
  line-height: 1;
  box-shadow: 0 0.2rem 0 rgba(0,0,0,0.12);
`;

export const BadgeText = styled.span`
  transform: translateY(-0.05em);
`;

export const CoinIconSmall = styled.span`
  display: inline-flex;
  width: clamp(0.9rem, 3vw, 1rem);
  height: clamp(0.9rem, 3vw, 1rem);
  align-items: center;
  justify-content: center;
  line-height: 0;
`;


export const Page = styled.div`
  min-height: 100dvh;
  background: #FFFFFF;
`;


export const Body = styled.main`
  padding: 12px;
`;

export const Placeholder = styled.div`
  height: 200px;
  border: 2px dashed #dbe2ee;
  border-radius: 12px;
  display: grid;
  place-items: center;
  color: #8a94a6;
  background: #fff;
`;