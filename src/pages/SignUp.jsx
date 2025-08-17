import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "../styles/SignUp.styles";
import StepBar from "../components/SignUp/StepBar";
import StepOne from "../components/SignUp/StepOne";
import StepTwo from "../components/SignUp/StepTwo";
import { signup } from "../api/auth";

export default function SignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [agreements, setAgreements] = useState({
    service: false,
    privacy: false,
    location: false,
    marketing: false,
  });
  const [job, setJob] = useState("");
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  const [sido, setSido] = useState("");
  const [sigungu, setSigungu] = useState("");
  const [dong, setDong] = useState("");

  const togglePlace = (place) => {
    setSelectedPlaces((prev) =>
      prev.includes(place) ? prev.filter((p) => p !== place) : [...prev, place]
    );
  };

  const handleToggle = (id) => {
    setAgreements((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isFirstValid =
    name &&
    birthYear &&
    birthMonth &&
    birthDay &&
    email &&
    password &&
    agreements.service &&
    agreements.privacy &&
    agreements.location;
  
  const isSecondValid = job && selectedPlaces.length === 3 && sido && sigungu && dong;

  const handleSubmit = async (e) => {
    const [pref1, pref2, pref3] = [...selectedPlaces, "", "", ""].slice(0, 3);
    const payload = {
      nickname: name,
      email,
      password,
      birthDate: `${birthYear}-${birthMonth.padStart(
        2,
        "0"
      )}-${birthDay.padStart(2, "0")}`,
      sido,
      sigungu,
      dong,
      role: job,
      pref1,
      pref2,
      pref3,
      locationConsent: agreements.location,
      marketingConsent: agreements.marketing,
      serviceAgreed: agreements.service,
      privacyAgreed: agreements.privacy,

    };
    try {
      await signup(payload);
      alert("회원가입이 완료되었습니다!");
      navigate("/signup-complete");
    } catch (err) {
      console.error("회원가입 실패:", err);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Wrapper>
      <StepBar step={step} />
      {step === 1 ? (
        <StepOne
          name={name}
          setName={setName}
          birthYear={birthYear}
          setBirthYear={setBirthYear}
          birthMonth={birthMonth}
          setBirthMonth={setBirthMonth}
          birthDay={birthDay}
          setBirthDay={setBirthDay}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          agreements={agreements}
          handleToggle={handleToggle}
          onNext={() => setStep(2)}
          isValid={isFirstValid}
        />
      ) : (
        <StepTwo
          job={job}
          setJob={setJob}
          sido={sido}
          setSido={setSido}
          sigungu={sigungu}
          setSigungu={setSigungu}
          dong={dong}
          setDong={setDong}
          selectedPlaces={selectedPlaces}
          togglePlace={togglePlace}
          onSubmit={handleSubmit}
          isValid={isSecondValid}
        />
      )}
    </Wrapper>
  );
}
