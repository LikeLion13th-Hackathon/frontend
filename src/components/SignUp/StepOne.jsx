import {
  Form,
  Field,
  Label,
  Required,
  Input,
  Select,
  Row,
  SubmitButton,
  VerifyButton,
} from "../../styles/SignUp.styles";
import { AgreementWrapper } from "../../styles/AgreementSection.styles";
import AgreementItem from "../AgreementItem";

export default function StepOne({
  name,
  setName,
  birthYear,
  setBirthYear,
  birthMonth,
  setBirthMonth,
  birthDay,
  setBirthDay,
  email,
  setEmail,
  password,
  setPassword,
  agreements,
  handleToggle,
  onNext,
  isValid,
}) {
  return (
    <>
      <Form>
        <Field>
          <Label>
            이름<Required>*</Required>
          </Label>
          <Row style={{ display: "flex", gap: "8px" }}>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력해주세요"
            />
            <VerifyButton onClick={() => alert("본인 확인")}>
              본인 확인
            </VerifyButton>
          </Row>
        </Field>

        <Field>
          <Label>
            생년월일<Required>*</Required>
          </Label>
          <Row>
            <Select
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
            >
              <option value="" disabled hidden>
                출생연도
              </option>
              {Array.from({ length: 100 }, (_, i) => 2024 - i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
            <Select
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.value)}
            >
              <option value="" disabled hidden>
                출생 월
              </option>
              {Array.from({ length: 12 }, (_, i) =>
                String(i + 1).padStart(2, "0")
              ).map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </Select>
            <Select
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
            >
              <option value="" disabled hidden>
                출생 일
              </option>
              {Array.from({ length: 31 }, (_, i) =>
                String(i + 1).padStart(2, "0")
              ).map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </Select>
          </Row>
        </Field>

        <Field>
          <Label>
            이메일<Required>*</Required>
          </Label>
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
          <Label>
            비밀번호<Required>*</Required>
          </Label>
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
          id="terms"
          label="서비스 약관 동의"
          required
          checked={agreements.terms}
          onToggle={handleToggle}
        >
          약관 내용
        </AgreementItem>
        <AgreementItem
          id="location"
          label="위치 정보 서비스 약관 동의"
          required
          checked={agreements.location}
          onToggle={handleToggle}
        >
          위치 정보 약관
        </AgreementItem>
        <AgreementItem
          id="marketing"
          label="마케팅 수신 동의"
          checked={agreements.marketing}
          onToggle={handleToggle}
        >
          선택 사항
        </AgreementItem>
      </AgreementWrapper>

      <SubmitButton onClick={onNext} disabled={!isValid}>
        다음으로
      </SubmitButton>
    </>
  );
}
