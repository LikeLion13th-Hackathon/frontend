import { useEffect } from "react";
import {
  Form, 
  Field, 
  Label, 
  Required, 
  Input, 
  Select, 
  Row, 
  SubmitButton,
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

  const daysInMonth = (y, m) => new Date(Number(y), Number(m), 0).getDate(); // m: 1~12
  const dayCount = birthYear && birthMonth ? daysInMonth(birthYear, birthMonth) : 31;

  // 월/년 바뀔 때 기존 day가 초과면 보정
  useEffect(() => {
    if (!birthYear || !birthMonth || !birthDay) return;
    const max = daysInMonth(birthYear, birthMonth);
    if (Number(birthDay) > max) setBirthDay(String(max).padStart(2, "0"));
  }, [birthYear, birthMonth]);

  return (
    <>
      <Form>
        <Field>
          <Label>이름<Required>*</Required></Label>
          <Row style={{ gap: 8 }}>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력해주세요"
            />
          </Row>
        </Field>

        <Field>
          <Label>생년월일<Required>*</Required></Label>
          <Row>
            <Select required value={birthYear} onChange={(e) => setBirthYear(e.target.value)}>
              <option value="" disabled hidden>출생연도</option>
              {Array.from({ length: 100 }, (_, i) => thisYear - i).map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </Select>

            <Select required value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)}>
              <option value="" disabled hidden>출생 월</option>
              {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </Select>

            <Select required value={birthDay} onChange={(e) => setBirthDay(e.target.value)}>
              <option value="" disabled hidden>출생 일</option>
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
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력해주세요."
            />
          </Row>
        </Field>

        <Field>
          <Label>비밀번호<Required>*</Required></Label>
          <Row>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요."
            />
          </Row>
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

      {/* Form 안에 버튼이면 기본 submit 막고 싶으면 type="button" 권장 */}
      <SubmitButton type="button" onClick={onNext} disabled={!isValid}>
        다음으로
      </SubmitButton>
    </>
  );
}