import axiosInstance from "./axiosInstance";

// 로그인
export const login = async ({ email, password }) => {
  const { data } = await axiosInstance.post("/api/auth/login", {
    email,
    password,
  });
  return data;
};

// 회원가입
export const signup = async ({
  email,
  password,
  nickname,
  birthDate,
  role,
  places,
  serviceAgreed,
  privacyAgreed,
  locationConsent,
  marketingConsent,
  sido,
  sigungu,
  dong,
}) => {
  const { data } = await axiosInstance.post("/api/auth/signup", {
    email,
    password,
    nickname,
    birthDate,
    role,
    places,
    serviceAgreed,
    privacyAgreed,
    locationConsent,
    marketingConsent,
    sido,
    sigungu,
    dong,
  });
  return data;
};