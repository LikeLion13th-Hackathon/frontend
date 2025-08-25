import Restaurant from "../assets/backgrounds/Restaurant.png";
import Park from "../assets/backgrounds/Park.png";

export const MISSION_CATEGORY = {
  CUSTOM: { label: "맞춤미션", image: Restaurant, badgeTextColor: "#FACD2B" },
  LANDMARK: { label: "지역명소", image: Park, badgeTextColor: "#F0702F" },
  RESTAURANT: { label: "지역맛집", image: Park, badgeTextColor: "#9FC136" },
  SPECIALTY: { label: "특산품", image: Park, badgeTextColor: "#FE98B6" },
  AI_CUSTOM: { label: "AI 추천", image: Restaurant, badgeTextColor: "#6C63FF" },
  ETC: { label: "기타", image: Park, badgeTextColor: "#565253ff" },
  // 필요시 더 추가
};
