import axios from "axios";

// 로그인
export const login = async ({ email, password }) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/auth/login`,
    { email, password },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
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
