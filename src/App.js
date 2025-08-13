import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// 추후 글꼴 import "./assets/fonts/Pretendard-Regular.ttf";

import Intro from "./pages/Intro";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import SignupComplete from "./pages/SignUpComplete";
import MainPage from "./pages/MainPage";
import Mission from "./pages/Mission";
import Shop from "./pages/Shop";
import LeaderBoard from "./pages/LeaderBoard";
import MyPage from "./pages/MyPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup-complete" element={<SignupComplete />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
