import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";

import Intro from "./pages/Intro";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SignupComplete from "./pages/SignUpComplete";
import MainPage from "./pages/MainPage";
import Mission from "./pages/Mission";
import MissionDetail from "./pages/MissionDetail";
import ReceiptUpload from "./components/MissionDetail/ReceiptUpload";
import ReceiptScanning from "./components/MissionDetail/ReceiptScan";
import ReceiptConfirm from "./components/MissionDetail/ReceiptConfirm";
import ReceiptSuccess from "./components/MissionDetail/ReceiptSuccess";
import ReceiptFail from "./components/MissionDetail/ReceiptFail";
import Shop from "./pages/Shop";
import LeaderBoard from "./pages/LeaderBoard";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <ThemeProvider theme={{}}>
      <GlobalStyle />
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup-complete" element={<SignupComplete />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/mission/:id" element={<MissionDetail />} />
          <Route path="/receipt/upload" element={<ReceiptUpload />} />
          <Route path="/receipt/scanning" element={<ReceiptScanning />} />
          <Route path="/receipt/confirm" element={<ReceiptConfirm />} />
          <Route path="/receipt/success" element={<ReceiptSuccess />} />
          <Route path="/receipt/fail" element={<ReceiptFail />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
