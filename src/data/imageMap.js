import bg1 from "../assets/shop/backgrounds/bg1.png";
import bg2 from "../assets/shop/backgrounds/bg2.png";

import bbiStep1 from "../assets/characters/bbiStep1.png"
import bbiStep2 from "../assets/characters/bbiStep2.png"
import bbiStep3 from "../assets/characters/bbiStep3.png"

import catStep1 from "../assets/characters/catStep1.png"
import catStep2 from "../assets/characters/catStep2.png"
import catStep3 from "../assets/characters/catStep3.png"

export const BG_SRC = {
  1: bg1,
  2: bg2,
  // 이어서 추가
};

export const getBgSrc = (backgroundId) => BG_SRC[backgroundId] ?? bg1;

export const SKIN_SRC = {
  1: bbiStep1,
  5: catStep1,
  // 이어서 추가
};

export const getSkinSrc = (skinId) => SKIN_SRC[skinId] ?? bbiStep1;