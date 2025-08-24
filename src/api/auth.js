import instance from "./axiosInstance";

// 로그인
export const login = async ({ email, password }) => {
  const { data } = await instance.post("/api/auth/login", { email, password });
  return data;
};

// 회원가입
export const signup = async (payload) => {
  const { data } = await instance.post("/api/auth/signup", payload);
  return data;
};
