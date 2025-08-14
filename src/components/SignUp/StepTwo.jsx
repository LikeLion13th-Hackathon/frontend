import {
  Label,
  Required,
  SubmitButton,
  RadioGroup,
  RadioOption,
  CheckboxGroup,
  CheckboxOption,
  Section,
} from "../../styles/SignUp.styles";

export default function StepTwo({
  job,
  setJob,
  selectedPlaces,
  togglePlace,
  onSubmit,
  isValid,
}) {
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

  return (
    <>
      <Section>
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
      </Section>

      <Section>
        <Label>
          선호 장소<Required>*</Required>
        </Label>
        <CheckboxGroup>
          {PLACES.map((place) => (
            <CheckboxOption key={place}>
              <input
                type="checkbox"
                value={place}
                checked={selectedPlaces.includes(place)}
                onChange={() => togglePlace(place)}
              />
              <span>{place}</span>
            </CheckboxOption>
          ))}
        </CheckboxGroup>
      </Section>

      <SubmitButton onClick={onSubmit} disabled={!isValid}>
        다음으로
      </SubmitButton>
    </>
  );
}
