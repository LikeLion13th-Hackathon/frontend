import instance from "./axiosInstance";

// 전체 캐릭터 카탈로그
export const getSkinCatalog = async () => {
  const { data } = await instance.get("/shop/skins");
  return data;
};

// 보유 캐릭터
export const getMySkins = async () => {
  const { data } = await instance.get("/shop/inventory/skins");
  return data;
};

// 캐릭터 구매
export const purchaseSkin = async (skinId) => {
  const { data } = await instance.post(
    "/shop/purchase/skin",
    null,
    {
      params: { skinId },
    }
  );
  return data;
};

// 캐릭터 적용
export const activateSkin = async (skinId) => {
  const { data } = await instance.patch(`/shop/skins/${skinId}/activate`);
  return data;
}