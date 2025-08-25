import instance from "./axiosInstance";

// 홈화면 캐릭터카드 조회
export const fetchHomeCard = async () => {
  const { data } = await instance.get("/api/home");
  return data;
};

// 메인페이지 미션 조회
export const fetchCustomMissionsLimited = async (limit = 3) => {
  const { data } = await instance.get(`/api/missions/custom?limit=${limit}`);
  return data;
};
