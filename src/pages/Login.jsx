// 로그인 페이지
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdOutlineEmail } from "react-icons/md";
import {
  Container,
  TitleSmall,
  BeeImg,
  LoginButton,
} from "../styles/Login.styles";
import { Button } from "../components/Button";
import Bee1 from "../assets/characters/Logo.png";
import MainLogo from "../assets/characters/Logo.png";
import {
  ModalContent,
  ModalOverlay,
  ModalInput,
} from "../styles/LoginModal.styles";
import SubLogo from "../assets/characters/Logo.png";
// import { login } from "../api/auth";

function Login() {
  // 모달창, 로그인 입력 여부 관리
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      // 로그인 API → 임시 Promise로 대체 (‼️명세서 나오면 바꾸기‼️)
      const fakeLogin = new Promise((resolve, reject) => {
        setTimeout(() => {
          // 테스트 계정
          if (email === "test" && password === "0000") {
            resolve({
              token: "dummy-token-123",
              user: { name: "홍길동", email },
            });
          } else {
            reject(new Error("Invalid credentials"));
          }
        }, 500);
      });

      const res = await fakeLogin;
      const { token, user } = res;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("로그인 성공!", { autoClose: 2000, hideProgressBar: true });

      setTimeout(() => {
        navigate("/mainpage");
      }, 100); // 로그인 성공 시 잠시 후 이동
    } catch (error) {
      toast.error("아이디/비밀번호가 맞지 않습니다.", {
        autoClose: 2000,
      });
      console.error("❌ 로그인 에러:", error);
    }
  };

  return (
    <Container>
      <img src={MainLogo} alt="로그인 이미지" style={{ width: "18vh" }} />
      <TitleSmall>소비를 게임처럼 어쩌고</TitleSmall>
      <BeeImg src={Bee1} />
      <LoginButton onClick={() => setShowModal(true)}>
        <MdOutlineEmail size={22} />
        이메일로 로그인
      </LoginButton>
      <Button onClick={() => navigate("/signup")}>회원가입</Button>

      {/* 상세로그인 (모달창) */}
      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <img src={SubLogo} style={{ width: "40%" }} />
            <h2 style={{ marginTop: "0", marginBottom: "1vh" }}>
              이메일 로그인
            </h2>

            <div style={{ fontWeight: "bold" }}>아이디</div>
            <ModalInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="아이디를 입력해주세요."
            />

            <div style={{ fontWeight: "bold" }}>비밀번호</div>
            <ModalInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요."
            />

            <button onClick={handleSubmit} disabled={!email || !password}>
              로그인
            </button>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}

export default Login;
