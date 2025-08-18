import {
  Label,
  Required,
  SubmitButton,
  RadioGroup,
  RadioOption,
  CheckboxGroup,
  CheckboxOption,
  LimitBadge,
  LabelRow,
  Row,
  Select,
  Field,
  Form,
} from "../../styles/SignUp.styles";
import { useMemo } from "react";
import InfoBox from "./InfoBox";

const JOBS = ["학생", "직장인", "프리랜서", "주부", "기타"];

const PLACES = [
  "카페",
  "식당",
  "박물관/미술관",
  "도서관",
  "공원/산책로",
  "운동 시설",
  "쇼핑센터",
  "전통 시장",
  "기타",
];

const ADDR = {
  서울특별시: {
    강남구: ["역삼동", "삼성동", "논현동"],
    종로구: ["청운동", "사직동", "부암동"],
    마포구: ["합정동", "서교동", "망원동"],
  },
  부산광역시: {
    해운대구: ["우동", "중동", "좌동"],
    수영구: ["광안동", "민락동", "남천동"],
    중구: ["영주동", "대청동", "보수동"],
  },
  대구광역시: {
    중구: ["동인동", "삼덕동", "남산동"],
    수성구: ["범어동", "만촌동", "두산동"],
  },
  경기도: {
    수원시: ["인계동", "영통동", "매탄동"],
    성남시: ["분당동", "정자동", "야탑동"],
    고양시: ["일산동", "주교동", "덕이동"],
  },
};

export default function StepTwo({
  job,
  setJob,
  sido,
  setSido,
  sigungu,
  setSigungu,
  dong,
  setDong,
  selectedPlaces,
  togglePlace,
  onSubmit,
  isValid,
}) {
  const sidoList = useMemo(() => Object.keys(ADDR), []);
  const sigunguList = useMemo(
    () => (sido ? Object.keys(ADDR[sido]) : []),
    [sido]
  );
  const dongList = useMemo(
    () => (sido && sigungu ? ADDR[sido][sigungu] : []),
    [sido, sigungu]
  );

  return (
    <>
      <Form>
        <Field>
          <Label>
            직업<Required>*</Required>
          </Label>
          <RadioGroup>
            {JOBS.map((j) => (
              <RadioOption key={j}>
                <input
                  type="radio"
                  name="job"
                  value={j}
                  checked={job === j}
                  onChange={() => setJob(j)}
                />
                <span>{j}</span>
              </RadioOption>
            ))}
          </RadioGroup>
        </Field>

        <Field>
          <Label>
            지역<Required>*</Required>
          </Label>
          <Row>
            <Select
              required
              value={sido}
              onChange={(e) => {
                setSido(e.target.value);
                setSigungu("");
                setDong("");
              }}
            >
              <option value="">시/도</option>
              {sidoList.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>

            <Select
              required
              value={sigungu}
              onChange={(e) => {
                setSigungu(e.target.value);
                setDong("");
              }}
              disabled={!sido}
            >
              <option value="">시/군/구</option>
              {sigunguList.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </Select>

            <Select
              required
              value={dong}
              onChange={(e) => setDong(e.target.value)}
              disabled={!sigungu}
            >
              <option value="">읍/면/동</option>
              {dongList.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Select>
          </Row>
        </Field>

        <Field>
          <LabelRow>
            <Label>
              선호 장소<Required>*</Required>
            </Label>
            <LimitBadge>3개 선택</LimitBadge>
          </LabelRow>
          <CheckboxGroup>
            {PLACES.map((place) => (
              <CheckboxOption key={place}>
                <input
                  type="checkbox"
                  value={place}
                  checked={selectedPlaces.includes(place)}
                  onChange={() => togglePlace(place)}
                  disabled={
                    !selectedPlaces.includes(place) &&
                    selectedPlaces.length >= 3
                  }
                />
                <span>{place}</span>
              </CheckboxOption>
            ))}
          </CheckboxGroup>
        </Field>
      </Form>

      <InfoBox />

      <SubmitButton onClick={onSubmit} disabled={!isValid}>
        다음으로
      </SubmitButton>
    </>
  );
}
