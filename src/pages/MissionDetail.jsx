// 미션 상세페이지
import { useNavigate } from "react-router-dom";
import { Header, BackIcon } from "../styles/MyPage.styles";
import {
  Container,
  Card, // 지도 박스(배경 이미지 들어감)
  TagRow,
  TagGroup,
  Badge,
  Title,
  Divider,
  LocationPill,
  LocEm,
  ChangeLink,
  Marker,
  Section,
  FieldTitle,
  FieldText,
} from "../styles/MissionDetail.styles";
import { Button } from "../components/Button";
import BbiBasic from "../assets/characters/bbi_basic.png"; // 마커용 이미지

function MissionDetail() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2vh", paddingTop: "1vh" }}>
      <Header>
        <BackIcon size={20} onClick={() => navigate("/mission")} />
        <h3>미션</h3>
      </Header>

      <Container>
        <Card /* $src={MapShot} */>
          <TagRow>
            <TagGroup>
              <Badge $variant="primary">맞춤미션</Badge>
              <Badge>영수증 인증</Badge>
            </TagGroup>
          </TagRow>
          <Title>○○동 음식점에서 7000원 이상 결제하기</Title>
          <Divider />
          <LocationPill>
            <LocEm>나의 위치</LocEm> | ○○광역시 ○○구 ○○동 ○○로 ○번길
            <ChangeLink onClick={() => navigate("/location/select")}>
              변경
            </ChangeLink>
          </LocationPill>
          <Marker src={BbiBasic} alt="marker" />

          {/* 3) 설명글 영역 */}
          <Section>
            <FieldTitle>미션 방법</FieldTitle>
            <FieldText>
              ○○동 음식점에서 7000원 이상 결제 후, 영수증 인증하기
            </FieldText>
          </Section>

          <Divider />

          <Section>
            <FieldTitle>미션 기간</FieldTitle>
            <FieldText>2025.08.01 ~ 08.15</FieldText>
          </Section>

          <Divider />

          <Section style={{ marginBottom: "8vh" }}>
            <FieldTitle>혜택</FieldTitle>
            <FieldText>200코인 지급</FieldText>
          </Section>
        </Card>

        <Button style={{ width: "100%" }}>미션 시작하기</Button>
      </Container>
    </div>
  );
}

export default MissionDetail;
