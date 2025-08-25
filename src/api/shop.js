import instance from "./axiosInstance";

// 상점 overview
export const getShopOverview = async () => {
  const { data } = await instance.get("/shop/overview");
  return data;
};

// 키우기
export const feed = async () => {
  const { data } = await instance.post("/shop/feed");
  return data;
};

// 코인 조회
export const getCoins = async () => {
  const { data } = await instance.get("/shop/coins");
  return data;
};

// 캐릭터 닉네임 변경
export const updateCharacterName = async (newName) => {
  const { data } = await instance.patch(`/shop/character/name?newName=${encodeURIComponent(newName)}`);
  return data;
};

// 진화
export const evolve = async () => {
  const { data } = await instance.post("/shop/evolve");
  return data;
};