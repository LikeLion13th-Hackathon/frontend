// 마이페이지 - 내 정보 수정
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, BackIcon } from "../styles/MyPage.styles";
import {
  Wrapper,
  Form,
  Field,
  Label,
  Input,
  Select,
  Row,
  SubmitButton,
  RadioGroup,
  RadioOption,
  CheckboxOption,
  LimitBadge,
} from "../styles/SignUp.styles";
import { signup } from "../api/auth"; // !!!!!!!!!! 실제 수정 API로 교체 필요

export default function MyPageEdit() {
  const navigate = useNavigate();

  // 사용자 기본 정보 (초기값은 API 연동 시 서버 데이터로 채우면 됨)
  const [name, setName] = useState("사용자명");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [email, setEmail] = useState("사용자메일");
  const [job, setJob] = useState("사용자직업");

  const [sido, setSido] = useState("인천광역시");
  const [sigungu, setSigungu] = useState("부평구");
  const [dong, setDong] = useState("부평동");

  const [selectedPlaces, setSelectedPlaces] = useState(["카페"]);

  // 현재 연도 & 선택한 연/월에 맞는 일 수 계산
  const thisYear = new Date().getFullYear();
  const dayCount =
    birthYear && birthMonth ? new Date(birthYear, birthMonth, 0).getDate() : 31;

  const togglePlace = (place) => {
    setSelectedPlaces((prev) => {
      if (prev.includes(place)) {
        // 이미 선택되어 있으면 해제
        return prev.filter((p) => p !== place);
      } else {
        // 새로 선택하려는데 이미 3개면 추가 막기
        if (prev.length >= 3) {
          alert("최대 3곳까지만 선택할 수 있습니다.");
          return prev;
        }
        return [...prev, place];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [pref1, pref2, pref3] = [...selectedPlaces, "", "", ""].slice(0, 3);

    const birthDate =
      birthYear && birthMonth && birthDay
        ? `${birthYear}-${birthMonth.padStart(2, "0")}-${birthDay.padStart(
            2,
            "0"
          )}`
        : "";

    const payload = {
      nickname: name,
      email,
      birthDate,
      sido,
      sigungu,
      dong,
      role: job,
      pref1,
      pref2,
      pref3,
    };

    try {
      await signup(payload); // TODO: 회원가입 대신 '정보수정 API'로 교체
      alert("정보가 수정되었습니다!");
      navigate("/mypage");
    } catch (err) {
      console.error("정보 수정 실패:", err);
      alert("수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Wrapper
      style={{ padding: "2vh", paddingTop: "1vh", paddingBottom: "80px" }}
    >
      <Header>
        <BackIcon size={20} onClick={() => navigate(-1)} />
        <h3>내 정보 변경</h3>
      </Header>

      <Form onSubmit={handleSubmit}>
        {/* 이름 */}
        <Field>
          <Label>이름</Label>
          <Row>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Row>
        </Field>

        {/* 생년월일 */}
        <Field>
          <Label>생년월일</Label>
          <Row>
            {/* 연도 */}
            <Select
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
            >
              <option value="">출생연도</option>
              {Array.from({ length: 100 }, (_, i) => thisYear - i).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </Select>

            {/* 월 */}
            <Select
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.value)}
              disabled={!birthYear}
            >
              <option value="">출생 월</option>
              {Array.from({ length: 12 }, (_, i) =>
                String(i + 1).padStart(2, "0")
              ).map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </Select>

            {/* 일 */}
            <Select
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
              disabled={!birthMonth}
            >
              <option value="">출생 일</option>
              {Array.from({ length: dayCount }, (_, i) =>
                String(i + 1).padStart(2, "0")
              ).map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Select>
          </Row>
        </Field>

        {/* 이메일 */}
        <Field>
          <Label>이메일</Label>
          <Row>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력해주세요."
            />
          </Row>
        </Field>

        {/* 직업 */}
        <Field>
          <Label>직업</Label>
          <RadioGroup>
            {["학생", "직장인", "프리랜서", "주부", "기타"].map((role) => (
              <RadioOption key={role}>
                <input
                  type="radio"
                  checked={job === role}
                  onChange={() => setJob(role)}
                />
                {role}
              </RadioOption>
            ))}
          </RadioGroup>
        </Field>

        {/* 지역 */}
        <Field>
          <Label>지역</Label>
          <Row>
            <Select value={sido} onChange={(e) => setSido(e.target.value)}>
              <option value="인천광역시">인천광역시</option>
              <option value="서울특별시">서울특별시</option>
            </Select>
            <Select
              value={sigungu}
              onChange={(e) => setSigungu(e.target.value)}
            >
              <option value="부평구">부평구</option>
              <option value="강남구">강남구</option>
            </Select>
            <Select value={dong} onChange={(e) => setDong(e.target.value)}>
              <option value="부평동">부평동</option>
              <option value="삼성동">삼성동</option>
            </Select>
          </Row>
        </Field>

        {/* 선호 장소 */}
        <Field>
          <Label>선호 장소(3개)</Label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px 2px",
              marginBottom: "5vh",
            }}
          >
            {[
              "카페",
              "식당",
              "박물관/미술관",
              "도서관",
              "공원/산책로",
              "운동 시설",
              "쇼핑센터",
              "전통 시장",
              "기타",
            ].map((place) => (
              <CheckboxOption style={{ gap: "1px" }} key={place}>
                <input
                  type="checkbox"
                  checked={selectedPlaces.includes(place)}
                  onChange={() => togglePlace(place)}
                />
                {place}
              </CheckboxOption>
            ))}
          </div>
        </Field>

        <SubmitButton type="submit">변경하기</SubmitButton>
      </Form>
    </Wrapper>
  );
}
