import instance from "./axiosInstance";

// 마이페이지 유저 조회
export const fetchMyProfile = async () => {
  const res = await instance.get("/api/mypage");
  return res.data;
};
