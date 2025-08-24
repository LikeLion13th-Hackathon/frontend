// 로그인 페이지
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Container,
  TitleSmall,
  BbiImg,
  Input,
  SignUpLink,
} from "../styles/Login.styles";
import { Button } from "../components/Button";
import bbiStep1 from "../assets/characters/bbiStep1.png";
import MainLogo from "../assets/characters/Logo.png";
import { login } from "../api/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 심사용 테스트계정
  const handleTestLogin = async () => {
    // 로그인 API
    try {
      const res = await login({
        email: "test3@example.com",
        password: "123123123123123",
      });
      const {
        userId,
        nickname,
        email: userEmail,
        accessToken,
        tokenType,
      } = res;

      // 사용자 정보 저장
      localStorage.setItem(
        "user",
        JSON.stringify({ userId, nickname, userEmail })
      );
      localStorage.setItem("token", accessToken);
      localStorage.setItem("tokenType", tokenType);
      localStorage.setItem("tutorialSeen_login", "false");

      // 성공 후 메인페이지로 이동
      navigate("/mainpage");
      toast.success("테스트 로그인 성공!", { autoClose: 2000 });

      // 실패
    } catch (err) {
      console.error("테스트 로그인 실패:", err);
      toast.error("테스트 로그인 실패 😢");
    }
  };

  // 일반 로그인
  const handleSubmit = async (e) => {
    e?.preventDefault?.();

    // 로그인 API
    try {
      const res = await login({ email, password });
      const {
        userId,
        nickname,
        email: userEmail,
        accessToken,
        tokenType,
        message,
      } = res?.data ?? res ?? {};

      // 사용자 정보 저장
      localStorage.setItem(
        "user",
        JSON.stringify({ userId, nickname, userEmail })
      );
      if (accessToken) localStorage.setItem("token", accessToken);
      if (tokenType) localStorage.setItem("tokenType", tokenType);
      localStorage.setItem("tutorialSeen_login", "false");

      // 성공 후 메인페이지로 이동
      toast.success(message, { autoClose: 2000 });
      navigate("/mainpage");

      // 실패
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("아이디/비밀번호가 맞지 않습니다.");
      } else {
        toast.error("서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  return (
    <Container>
      <img src={MainLogo} alt="타이틀" style={{ width: "18vh" }} />
      <TitleSmall>소개문구 소개문구 소개문구</TitleSmall>
      <BbiImg src={bbiStep1} />

      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="아이디를 입력해주세요."
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력해주세요."
      />

      <Button onClick={handleSubmit} disabled={!email || !password}>
        로그인
      </Button>

      <div style={{ display: "flex", gap: "4vw" }}>
        <SignUpLink to="/signup">회원 가입하기</SignUpLink>
        <SignUpLink to="#" onClick={handleTestLogin}>
          테스트 로그인(심사용)
        </SignUpLink>
      </div>
    </Container>
  );
}

export default Login;
