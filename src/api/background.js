import instance from "./axiosInstance";

// 전체 배경 카탈로그
export const getBackgroundCatalog = async () => {
  const { data } = await instance.get("/shop/backgrounds");
  return data;
};

// 보유 배경
export const getMyBackgrounds = async () => {
  const { data } = await instance.get("/shop/inventory/backgrounds");
  return data;
};

// 배경 구매
export const purchaseBackground = async (backgroundId) => {
  const { data } = await instance.post(
    "/shop/purchase/background",
    null,
    {
      params: { backgroundId },
    }
  );
  return data;
};

// 배경 적용
export const activateBackground = async (backgroundId) => {
  const { data } = await instance.patch(`/shop/backgrounds/${backgroundId}/activate`);
  return data;
}