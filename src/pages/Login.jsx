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
import BbiBasic from "../assets/characters/bbi_basic.png";
import MainLogo from "../assets/characters/Logo.png";
import { login } from "../api/auth";

function Login() {
  // 로그인 입력 여부 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
      <BbiImg src={BbiBasic} />

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

      <SignUpLink to="/signup">회원 가입하기</SignUpLink>
    </Container>
  );
}

export default Login;
