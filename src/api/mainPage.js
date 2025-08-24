import instance from "./axiosInstance";

// 홈 화면 조회
export const fetchMainPageData = async () => {
  try {
    const { data } = await instance.get("/api/home");
    return data;
  } catch (error) {
    console.error("메인페이지 데이터를 가져오는 데 실패했습니다.", error);
    throw error;
  }
};
