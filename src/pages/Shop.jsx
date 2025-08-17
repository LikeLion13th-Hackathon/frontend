// 상점 페이지
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function MainPage() {
  const navigate = useNavigate();

  return (
    <div>
      상점 페이지
      <Footer />
    </div>
  );
}

export default MainPage;
