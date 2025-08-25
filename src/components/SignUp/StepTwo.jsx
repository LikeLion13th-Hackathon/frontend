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
  Field,
  Form,
} from "../../styles/SignUp.styles";
import { useMemo } from "react";
import InfoBox from "./InfoBox";
import SEOUL from "../../assets/addr/seoul.json";
import INCHEON from "../../assets/addr/incheon.json";
import Select from "../Select";

const ADDR = {
  ...SEOUL,
  ...INCHEON,
};

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

const toOptions = (arr) => arr.map((v) => ({ value: v, label: v }));

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
