// 마이페이지 수정
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
} from "../styles/SignUp.styles";
import { fetchMyProfile, updateMyProfile } from "../api/mypage";

// 백-프론트 매핑
const PLACE_MAP = {
  CAFE: "카페",
  RESTAURANT: "식당",
  MUSEUM: "박물관/미술관",
  LIBRARY: "도서관",
  PARK: "공원/산책로",
  GYM: "운동 시설",
  SHOPPING_MALL: "쇼핑센터",
  MARKET: "전통 시장",
  OTHER: "기타",
};
const REVERSE_PLACE_MAP = Object.fromEntries(
  Object.entries(PLACE_MAP).map(([code, label]) => [label, code])
);

const REGIONS = {
  서울특별시: {
    강남구: ["삼성동", "역삼동"],
    서대문구: ["북가좌동", "남가좌동"],
  },
  인천광역시: {
    부평구: ["부평동", "삼산동"],
  },
};

export default function MyPageEdit() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [job, setJob] = useState("");
  const [sido, setSido] = useState("");
  const [sigungu, setSigungu] = useState("");
  const [dong, setDong] = useState("");
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  // 현재 연도 & 선택한 연/월에 맞는 일 수 계산
  const thisYear = new Date().getFullYear();
  const dayCount =
    birthYear && birthMonth ? new Date(birthYear, birthMonth, 0).getDate() : 31;

  // 프로필 불러오기
  useEffect(() => {
    const load = async () => {
      const data = await fetchMyProfile();
      setName(data.nickname || "");
      setJob(data.job || "");
      setSido(data.regionSido || "");
      setSigungu(data.regionGungu || "");
      setDong(data.regionDong || "");
      if (data.birthDate) {
        const [y, m, d] = data.birthDate.split("-");
        setBirthYear(y);
        setBirthMonth(m);
        setBirthDay(d);
      }
      setSelectedPlaces(
        (data.preferPlaces || []).map((code) => PLACE_MAP[code] || code)
      );
    };
    load();
  }, []);

  // 선호 장소 선택 토글
  const togglePlace = (place) => {
    setSelectedPlaces((prev) => {
      if (prev.includes(place)) {
        return prev.filter((p) => p !== place);
      } else {
        if (prev.length >= 3) {
          // ✅ 중복 실행 방지 → toast는 한 번만 뜨도록
          toast.warn("최대 3곳까지만 선택할 수 있습니다.", {
            toastId: "max-places",
            autoClose: 2000,
          });
          return prev;
        }
        return [...prev, place];
      }
    });
  };

  // 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    const birthDate =
      birthYear && birthMonth && birthDay
        ? `${birthYear}-${birthMonth.padStart(2, "0")}-${birthDay.padStart(
            2,
            "0"
          )}`
        : "";

    const payload = {
      nickname: name,
      birthDate,
      job,
      regionSido: sido,
      regionGungu: sigungu,
      regionDong: dong,
      preferPlaces: selectedPlaces.map((label) => REVERSE_PLACE_MAP[label]),
    };

    try {
      await updateMyProfile(payload);
      toast.success("정보가 수정되었습니다!", { autoClose: 2000 });
      navigate("/mypage");
    } catch (err) {
      console.error("정보 수정 실패:", err);
      toast.error("수정에 실패했습니다. 다시 시도해주세요.", {
        autoClose: 2000,
      });
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
            <Select
              value={sido}
              onChange={(e) => {
                setSido(e.target.value);
                setSigungu("");
                setDong("");
              }}
            >
              <option value="">시/도 선택</option>
              {Object.keys(REGIONS).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>

            <Select
              value={sigungu}
              onChange={(e) => {
                setSigungu(e.target.value);
                setDong("");
              }}
              disabled={!sido}
            >
              <option value="">구/군 선택</option>
              {sido &&
                Object.keys(REGIONS[sido]).map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
            </Select>

            <Select
              value={dong}
              onChange={(e) => setDong(e.target.value)}
              disabled={!sigungu}
            >
              <option value="">동 선택</option>
              {sido &&
                sigungu &&
                REGIONS[sido][sigungu].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
            </Select>
          </Row>
        </Field>

        {/* 선호 장소 */}
        <Field>
          <Label>선호 장소 (최대 3개)</Label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "12px 4px",
              marginBottom: "5vh",
            }}
          >
            {Object.values(PLACE_MAP).map((place) => (
              <CheckboxOption key={place}>
                <input
                  type="checkbox"
                  checked={selectedPlaces.includes(place)}
                  onChange={() => togglePlace(place)}
                  disabled={
                    !selectedPlaces.includes(place) &&
                    selectedPlaces.length >= 3
                  }
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
