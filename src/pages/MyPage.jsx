// 마이페이지
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiChevronRight } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import {
  Container,
  Header,
  ProfileSection,
  UserInfo,
  Name,
  Email,
  BackIcon,
  Divider,
  Section,
  SectionTitle,
  InfoItem,
  Label,
  Value,
  ChangeSection,
  ChangeText,
  SettingItem,
} from "../styles/MyPage.styles";
import Footer from "../components/Footer";
// import { fetchMyProfile } from "../api/user";

function MyPage() {
  const navigate = useNavigate();

  // ‼️ API 대신 하드코딩된 사용자 정보 (명세서 나오면 바꾸기!)
  const [user] = useState({
    nickname: "테스트",
    email: "test@test.com",
    birthdate: "2000-01-01",
    job: "학생",
  });

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("정상적으로 로그아웃되었습니다.", { autoClose: 2000 });
    navigate("/login");
  };

  if (!user) return <div>Loading...</div>;

  const { nickname, email, birthdate, job } = user;

  return (
    <>
      <Container>
        <Header>
          <BackIcon size={20} onClick={() => navigate(-1)} />
          <h3>마이페이지</h3>
        </Header>

        <ProfileSection>
          <FaUserCircle size={46} style={{ color: "#767676" }} />
          <UserInfo>
            <Name>{nickname}</Name>
            <Email>{email}</Email>
          </UserInfo>
        </ProfileSection>

        <Divider />

        <Section>
          <SectionTitle>내 정보</SectionTitle>
          <InfoItem>
            <Label>이메일</Label>
            <Value>{email}</Value>
          </InfoItem>
          <InfoItem>
            <Label>생년월일</Label>
            <Value>{birthdate}</Value>
          </InfoItem>
          <InfoItem>
            <Label>직업</Label>
            <Value>{job}</Value>
          </InfoItem>
          <ChangeSection>
            <ChangeText onClick={() => navigate("/mypage/edit-profile")}>
              변경하기
            </ChangeText>
            <FiChevronRight style={{ color: "#767676", marginTop: "1.5px" }} />
          </ChangeSection>
        </Section>

        <Divider />

        <Section>
          <SectionTitle>미션 관리</SectionTitle>
          <SettingItem>
            진행 중인 미션 <FiChevronRight />
          </SettingItem>
          <SettingItem>
            완료한 미션 <FiChevronRight />
          </SettingItem>

          <Divider />

          <SettingItem
            onClick={handleLogout}
            style={{ color: "rgb(210, 80, 81)" }}
          >
            로그아웃 <FiChevronRight />
          </SettingItem>
        </Section>
      </Container>
      <Footer />
    </>
  );
}

export default MyPage;
