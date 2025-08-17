// 리더보드 페이지
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function MainPage() {
  const navigate = useNavigate();

  // 토큰 없으면 로그인 페이지로 리다이렉션
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token || token === "null" || token.trim() === "") {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  return (
    <div>
      리더보드 페이지
      <Footer />
    </div>
  );
}

export default MainPage;
