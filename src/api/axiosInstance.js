import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 헤더에 요청 실어 보내기
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    // 로그아웃 후 헤더 제거
    delete config.headers.Authorization;
  }
  return config;
});

// 공통 에러 처리
instance.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    const data = err.response?.data;
    const url = err.config?.url;
    const method = err.config?.method;
    console.error("API 요청 에러 ▶", { method, url, status, data });
    return Promise.reject(err);
  }
);

export default instance;
