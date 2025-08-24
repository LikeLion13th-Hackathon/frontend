import instance from "./axiosInstance";

// 월별 총 소비량 총액
export const fetchMonthlySummary = async () => {
  const { data } = await instance.get("/api/missions/summary/monthly");
  return data;
};

// 장소별 미션 성공 횟수
export const fetchMonthlyCategorySummary = async () => {
  const { data } = await instance.get("/api/missions/summary/monthly-category");
  return data;
};

// 미션별 평균 소비 금액
export const fetchAverageSpending = async () => {
  const { data } = await instance.get("/api/missions/summary/average");
  return data;
};
