import axios from "axios";
import instance from "./axiosInstance";

// 로그인
export const login = async ({ email, password }) => {
  const { data } = await instance.post("/api/auth/login", { email, password });
  return data;
};

// 회원가입
export const signup = async (payload) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/auth/signup`,
    payload,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return data;
};
