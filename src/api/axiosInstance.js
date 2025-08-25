import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  timeout: 20000,
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
    console.error("API 요청 에러 ▶", {
      method: err.config?.method,
      url: err.config?.url,
      status,
      data,
    });

    return Promise.reject(data || err);
  }
);

export default instance;
