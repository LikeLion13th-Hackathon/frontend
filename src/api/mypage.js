import instance from "./axiosInstance";

// 내 정보 조회
export const fetchMyProfile = async () => {
  const res = await instance.get("/api/me");
  return res.data;
};

// 내 정보 수정
export const updateMyProfile = async (payload) => {
  const res = await instance.patch("/api/me", payload);
  return res.data;
};

// 진행 중 미션 조회
export const fetchOngoingMissions = async () => {
  try {
    const { data } = await instance.get("/api/me/missions/in-progress");
    return data;
  } catch (error) {
    console.error("진행 중 미션 불러오기 실패:", error);
    throw error;
  }
};

// 완료 미션 조회
export const fetchCompletedMissions = async () => {
  try {
    const { data } = await instance.get("/api/me/missions/completed");
    return data;
  } catch (error) {
    console.error("완료된 미션 불러오기 실패:", error);
    throw error;
  }
};
