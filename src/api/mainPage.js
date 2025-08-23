// 홈 화면 조회
import axios from "axios";

export const fetchMainPageData = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/home`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("메인페이지 데이터를 가져오는 데 실패했습니다.");
  }
};
