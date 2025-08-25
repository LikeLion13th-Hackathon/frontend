import bg1 from "../assets/shop/backgrounds/bg1.png";
import bg2 from "../assets/shop/backgrounds/bg2.png";
import 경복궁 from "../assets/backgrounds/경복궁.png";
import 남산 from "../assets/backgrounds/남산.png";
import 차이나타운 from "../assets/backgrounds/차이나타운.png";
import 한강 from "../assets/backgrounds/한강.png";

import bbiStep1 from "../assets/characters/bbiStep1.png";
import bbiStep2 from "../assets/characters/bbiStep2.png";
import bbiStep3 from "../assets/characters/bbiStep3.png";

import catStep1 from "../assets/characters/catStep1.png";
import catStep2 from "../assets/characters/catStep2.png";
import catStep3 from "../assets/characters/catStep3.png";

export const BG_MAP = {
  1: bg1,
  2: bg2,
  3: 경복궁,
  4: 남산,
  5: 차이나타운,
  6: 한강,
};

export const getBgImg = (backgroundId) => BG_MAP[backgroundId] ?? bg1;

export const CHARACTER_MAP = {
  1: {
    // 캐릭터 ID 1 = 삐약이
    1: { img: bbiStep1, title: "호기심 많은 삐약이" },
    2: { img: bbiStep2, title: "활발한 삐약이" },
    3: { img: bbiStep3, title: "용맹한 삐약대장" },
  },
  3: { // 캐릭터 ID 2 = 고양이
    1: { img: catStep1, title: "얌전한 야옹이" },
    2: { img: catStep2, title: "새침한 야옹이" },
    3: { img: catStep3, title: "도도한 야옹이" },
  },
  // 필요 시 다른 캐릭터 추가
};

export const getCharStageMeta = (characterId, level) =>
  CHARACTER_MAP[characterId]?.[level] ?? null;

export const getCharImg = (characterId, level) =>
  getCharStageMeta(characterId, level)?.img ?? bbiStep1;

export const getCharTitle = (characterId, level) =>
  getCharStageMeta(characterId, level)?.title ?? "알 수 없는 캐릭터";
