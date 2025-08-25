// 마이페이지 수정
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Header, BackIcon } from "../styles/MyPage.styles";
import {
  Wrapper,
  Form,
  Field,
  Label,
  Input,
  Row,
  SubmitButton,
  RadioGroup,
  RadioOption,
  CheckboxOption,
} from "../styles/SignUp.styles";
import { fetchMyProfile, updateMyProfile } from "../api/mypage";
import Select from "../components/Select";
import SEOUL from "../assets/addr/seoul.json";
import INCHEON from "../assets/addr/incheon.json";

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

const ADDR = {
  ...SEOUL,
  ...INCHEON,
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
  const daysInMonth = (y, m) => new Date(Number(y), Number(m), 0).getDate(); // m: 1~12
  const dayCount =
    birthYear && birthMonth ? daysInMonth(birthYear, birthMonth) : 31;

  // 월/년 바뀔 때 기존 day가 초과면 보정
  useEffect(() => {
    if (!birthYear || !birthMonth || !birthDay) return;
    const max = daysInMonth(birthYear, birthMonth);
    if (Number(birthDay) > max) setBirthDay(String(max).padStart(2, "0"));
  }, [birthYear, birthMonth, birthDay, setBirthDay]);

  const yearOptions = useMemo(
    () =>
      Array.from({ length: 100 }, (_, i) => thisYear - i).map((y) => ({
        value: String(y),
        label: String(y),
      })),
    [thisYear]
  );
  const monthOptions = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map(
        (m) => ({ value: m, label: m })
      ),
    []
  );
  const dayOptions = useMemo(
    () =>
      Array.from({ length: dayCount }, (_, i) =>
        String(i + 1).padStart(2, "0")
      ).map((d) => ({ value: d, label: d })),
    [dayCount]
  );

  const toOptions = (arr) => arr.map((v) => ({ value: v, label: v }));

  const sidoList = useMemo(() => Object.keys(ADDR), []);
  const sigunguList = useMemo(
    () => (sido ? Object.keys(ADDR[sido]) : []),
    [sido]
  );
  const dongList = useMemo(
    () => (sido && sigungu ? ADDR[sido][sigungu] : []),
    [sido, sigungu]
  );

  // options
  const sidoOptions = useMemo(() => toOptions(sidoList), [sidoList]);
  const sigunguOptions = useMemo(() => toOptions(sigunguList), [sigunguList]);
  const dongOptions = useMemo(() => toOptions(dongList), [dongList]);

  // 선택된 option
  const selectedSido = useMemo(
    () => sidoOptions.find((o) => o.value === sido) ?? null,
    [sido, sidoOptions]
  );
  const selectedSigungu = useMemo(
    () => sigunguOptions.find((o) => o.value === sigungu) ?? null,
    [sigungu, sigunguOptions]
  );
  const selectedDong = useMemo(
    () => dongOptions.find((o) => o.value === dong) ?? null,
    [dong, dongOptions]
  );

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
              placeholder="출생연도"
              options={yearOptions}
              value={birthYear ? { value: birthYear, label: birthYear } : null}
              onChange={(opt) => {
                setBirthYear(opt?.value || "");
              }}
            />
            <Select
              placeholder="출생 월"
              options={monthOptions}
              value={
                birthMonth ? { value: birthMonth, label: birthMonth } : null
              }
              onChange={(opt) => {
                setBirthMonth(opt?.value || "");
              }}
              isDisabled={!birthYear}
            />
            <Select
              placeholder="출생 일"
              options={dayOptions}
              value={birthDay ? { value: birthDay, label: birthDay } : null}
              onChange={(opt) => setBirthDay(opt?.value || "")}
              isDisabled={!birthMonth}
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
            <Select
              placeholder="시/도"
              options={sidoOptions}
              value={selectedSido}
              onChange={(opt) => {
                const v = opt?.value || "";
                setSido(v);
                setSigungu("");
                setDong("");
              }}
            />
            <Select
              placeholder="시/군/구"
              options={sigunguOptions}
              value={selectedSigungu}
              onChange={(opt) => {
                const v = opt?.value || "";
                setSigungu(v);
                setDong("");
              }}
              isDisabled={!sido}
            />
            <Select
              placeholder="읍/면/동"
              options={dongOptions}
              value={selectedDong}
              onChange={(opt) => setDong(opt?.value || "")}
              isDisabled={!sigungu}
            />
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
