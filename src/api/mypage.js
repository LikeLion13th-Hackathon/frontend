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
