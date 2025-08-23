import { useEffect, useState } from "react";
import {
  Form,
  Field,
  Label,
  Required,
  Input,
  Select,
  Row,
  SubmitButton,
  ErrorMessage
} from "../../styles/SignUp.styles";
import { AgreementWrapper } from "../../styles/AgreementSection.styles";
import AgreementItem from "../SignUp/AgreementItem";
import terms from "../../assets/policies/terms.json";
import TermsContent from "./TermsContent";

export default function StepOne({
  name, setName,
  birthYear, setBirthYear,
  birthMonth, setBirthMonth,
  birthDay, setBirthDay,
  email, setEmail,
  password, setPassword,
  agreements, handleToggle,
  onNext, isValid,
}) {
  const thisYear = new Date().getFullYear();

  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const daysInMonth = (y, m) => new Date(Number(y), Number(m), 0).getDate(); // m: 1~12
  const dayCount = birthYear && birthMonth ? daysInMonth(birthYear, birthMonth) : 31;

  // 월/년 바뀔 때 기존 day가 초과면 보정
  useEffect(() => {
    if (!birthYear || !birthMonth || !birthDay) return;
    const max = daysInMonth(birthYear, birthMonth);
    if (Number(birthDay) > max) setBirthDay(String(max).padStart(2, "0"));
  }, [birthYear, birthMonth, birthDay, setBirthDay]);

  // 이메일 검사
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.length > 0 && !emailRegex.test(value)) {
      setEmailError("이메일 형식으로 입력해 주세요.");
    } else {
      setEmailError("");
    }
  };

  // 비밀번호 검사
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length > 0 && value.length < 8) {
      setPasswordError("8글자 이상 입력해 주세요.");
    } else {
      setPasswordError("");
    }
  };

  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Field>
          <Label>이름<Required>*</Required></Label>
          <Row style={{ gap: 8 }}>
            <Input
              id="name"
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력해주세요"
            />
          </Row>
        </Field>

        <Field>
          <Label>생년월일<Required>*</Required></Label>
          <Row>
            <Select
              required
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
            >
              <option value="">출생연도</option>
              {Array.from({ length: 100 }, (_, i) => thisYear - i).map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </Select>

            <Select
              required
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.value)}
              disabled={!birthYear}
            >
              <option value="">출생 월</option>
              {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </Select>

            <Select
              required
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
              disabled={!birthMonth}
            >
              <option value="">출생 일</option>
              {Array.from({ length: dayCount }, (_, i) => String(i + 1).padStart(2, "0")).map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </Select>
          </Row>
        </Field>

        <Field>
          <Label>이메일<Required>*</Required></Label>
          <Row>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="이메일을 입력해주세요."
            />
          </Row>
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        </Field>

        <Field>
          <Label>비밀번호<Required>*</Required></Label>
          <Row>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="비밀번호를 입력해주세요."
            />
          </Row>
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        </Field>
      </Form>

      <AgreementWrapper>
        <AgreementItem
          id="service"
          label={terms.service.title}
          required={terms.service.required}
          checked={agreements.service}
          onToggle={handleToggle}
        >
          <TermsContent md={terms.service.content} />
        </AgreementItem>
        <AgreementItem
          id="privacy"
          label={terms.privacy.title}
          required={terms.privacy.required}
          checked={agreements.privacy}
          onToggle={handleToggle}
        >
          <TermsContent md={terms.privacy.content} />
        </AgreementItem>
        <AgreementItem
          id="location"
          label={terms.location.title}
          required={terms.location.required}
          checked={agreements.location}
          onToggle={handleToggle}
        >
          <TermsContent md={terms.location.content} />
        </AgreementItem>
        <AgreementItem
          id="marketing"
          label={terms.marketing.title}
          required={terms.marketing.required}
          checked={agreements.marketing}
          onToggle={handleToggle}
        >
          <TermsContent md={terms.marketing.content} />
        </AgreementItem>
      </AgreementWrapper>

      <SubmitButton
        type="button"
        onClick={onNext}
        disabled={!isValid || !!passwordError || !!emailError}
      >
        다음으로
      </SubmitButton>
    </>
  );
}