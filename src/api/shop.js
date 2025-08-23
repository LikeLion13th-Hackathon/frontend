import instance from "./axiosInstance";

//상점 overview
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