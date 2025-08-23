// 마이페이지
import { useState, useEffect } from "react";
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
import { fetchMyProfile } from "../api/mypage";

function MyPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // 유저 조회
  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchMyProfile();
        setUser(data);
      } catch (err) {
        console.error("프로필 불러오기 실패:", err);
        toast.error("프로필을 불러오지 못했습니다.");
      }
    };
    loadUser();
  }, []);

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenType");
    localStorage.removeItem("user");
    toast.success("정상적으로 로그아웃되었습니다.", { autoClose: 2000 });
    navigate("/login");
  };

  if (!user) return <div>로딩 중...</div>;

  const { nickname, email, birthDate, job } = user;

  return (
    <>
      <Container>
        <Header>
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
            <Value>{birthDate}</Value>
          </InfoItem>
          <InfoItem>
            <Label>직업</Label>
            <Value>{job}</Value>
          </InfoItem>
          <ChangeSection>
            <ChangeText onClick={() => navigate("/mypage/edit")}>
              변경하기
            </ChangeText>
            <FiChevronRight style={{ color: "#767676", marginTop: "1.5px" }} />
          </ChangeSection>
        </Section>

        <Divider />

        <Section>
          <SectionTitle>미션 관리</SectionTitle>
          <SettingItem onClick={() => navigate("/missions/ongoing")}>
            진행 중인 미션 <FiChevronRight />
          </SettingItem>
          <SettingItem onClick={() => navigate("/missions/completed")}>
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
