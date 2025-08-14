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
  // 모달창, 로그인 입력 여부 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e?.preventDefault?.();

    try {
      const res = await login({ email, password }); // 아래 login 함수 참고
      const { userId, nickname, email: userEmail, message } = res.data ?? res;

      // 필요하면 사용자 정보 저장
      localStorage.setItem(
        "user",
        JSON.stringify({ userId, nickname, email: userEmail })
      );

      toast.success(message || "로그인 성공!", {
        autoClose: 2000,
        hideProgressBar: true,
      });

      setTimeout(() => {
        navigate("/mainpage");
      }, 100);
    } catch (error) {
      toast.error("아이디/비밀번호가 맞지 않습니다.", { autoClose: 2000 });
      console.error("❌ 로그인 에러:", error);
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
