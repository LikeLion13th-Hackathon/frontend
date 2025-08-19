import axios from "axios";

// 로그인
export const login = async ({ email, password }) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/auth/signup`,
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

// 회원가입 혹시 이걸로?
// export const signup = async (payload) => {
//   const { data } = await instance.post("/api/auth/signup", payload);
//   return data;
// };
