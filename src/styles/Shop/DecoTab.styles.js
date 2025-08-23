import styled from "styled-components";
import { GrowBox } from "./GrowTab.styles"

// 꾸미기 상점 탭
export const DecoBox = styled(GrowBox)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
  padding: 0;

  max-height: 40vh;
  overflow-y: auto;
`;

export const DecoTabs = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;

  display: flex;
  padding: 3vw 3vw 1vw;
  gap: 2vw;

  border-radius: inherit;
  border: inherit;
  background: rgba(255, 255, 255, 0.9)
`;

export const DecoTabBtn = styled.button`
  box-sizing: border-box;
  inline-size: clamp(63px, 14vw, 96px);
  block-size: clamp(30px, 5.6vw, 40px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: clamp(4px, 1vw, 6px) clamp(8px, 2vw, 12px);
  
  font-weight: 500;
  font-size: clamp(13px, 2vw, 18px);  
  
  border-radius: 50px;
  border: none;

  background: ${({ $active }) => ($active ? "#FACD2B" : "#EBF0F7")};
  color: ${({ $active }) => ($active ? "#FFFFFF" : "#808080")};
`;

// 상점 아이템
export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch; 
  gap: 8px;
  width: 100%;  
`;

export const ItemButton = styled.button`
  box-sizing: border-box;
  width: 100%;  
  aspect-ratio: 108 / 120;
  max-height: 180px;  
  min-height: 100px; 

  border: none;
  border-radius: 10px;
  background: #FFFFFF;
  box-shadow: 0px 2px 6px 4px rgba(212, 212, 212, 0.59);
  position: relative;
  overflow: hidden;
  transition: transform 120ms ease, box-shadow 120ms ease, background 160ms ease;

  &:active { transform: ${({ $disabled }) => ($disabled ? "none" : "scale(0.98)")}; }
`;

export const Thumb = styled.div`
  inset: 0;
  position: absolute;
  background-size: cover;
  background-position: center;
  filter: none;
`;

export const LockOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;

  padding: 8px;
  border-radius: inherit;

  background: rgba(219, 219, 219, 0.66);
  backdrop-filter: blur(6.4px);

  color: #FFFFFF;
  font-weight: 700;
  text-align: center;

  & > span {
    font-size: clamp(10px, 2.5vw, 14px);
    color: #FFFFFF;
  }
`;

export const ActiveOutline = styled.span`
  pointer-events: none;
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: inset 0 0 0 2px #808080;
`;

export const ItemLabel = styled.div`
  width: 100%; 
  font-size: clamp(12px, 2.5vw, 14px);
  font-weight: 700;
  color: #808080;

  display: flex;
  justify-content: flex-end; 
`;

export const PriceRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 2px;
`;

export const CoinIconSm = styled.span`
  display: inline-flex;
  width: 16px; 
  height: 16px;
  align-items: center; 
  justify-content: center;
  line-height: 0;
  color: #FACD2B;
`;

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  place-items: start center;
  padding: 0 3vw;
`;

export const GridScroll = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: env(safe-area-inset-bottom, 0);
  padding: 1vw;
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
`;