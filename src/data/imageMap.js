import bg1 from "../assets/shop/backgrounds/bg1.png";
import bg2 from "../assets/shop/backgrounds/bg2.png";

import skin1 from "../assets/shop/characters/bbi_basic.png"
import skin2 from "../assets/shop/characters/bbi_basic.png"

export const BG_SRC = {
  1: bg1,
  2: bg2,
  // 이어서 추가
};

export const getBgSrc = (backgroundId) => BG_SRC[backgroundId] ?? bg1;

export const SKIN_SRC = {
  1: skin1,
  2: skin2,
  // 이어서 추가
};

export const getSkinSrc = (skinId) => SKIN_SRC[skinId] ?? skin1;