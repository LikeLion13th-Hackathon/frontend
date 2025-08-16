// 미션 상세페이지
import { useState } from "react";
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
  MapBox,
  Marker,
  Section,
  FieldTitle,
  FieldText,
} from "../styles/MissionDetail.styles";
import MapView from "../components/MapView";
import { Button } from "../components/Button";
import BbiBasic from "../assets/characters/bbi_basic.png"; // 마커용 이미지

function MissionDetail() {
  const navigate = useNavigate();
  const [addr, setAddr] = useState("");
  const KAKAO_KEY = process.env.REACT_APP_KAKAO_MAP_KEY?.trim() || "";

  return (
    <div style={{ padding: "2vh", paddingTop: "1vh" }}>
      <Header>
        <BackIcon size={20} onClick={() => navigate("/mission")} />
        <h3>미션</h3>
      </Header>

      <Container>
        <Card>
          <TagRow>
            <TagGroup>
              <Badge>맞춤미션</Badge>
              <Badge>영수증 인증</Badge>
            </TagGroup>
          </TagRow>
          <Title>○○동 음식점에서 7000원 이상 결제하기</Title>

          <Divider />

          {/* ▶ 여기! 실제 지도 */}
          <div style={{ position: "relative", width: "100%" }}>
            <MapView
              appKey={KAKAO_KEY}
              markerSrc={BbiBasic} // ✅ 캐릭터 마커
              onAddressChange={({ address }) => setAddr(address)}
            />
            {/* 지도 위 알약 오버레이 */}
            <LocationPill
              style={{
                position: "absolute",
                left: 12,
                top: 12,
                color: "#79797B",
              }}
            >
              <LocEm>나의 위치</LocEm> | {addr || "위치 확인 중…"}
            </LocationPill>
          </div>

          <Section>
            <FieldTitle>미션 방법</FieldTitle>
            <FieldText>
              ○○동 음식점에서 7000원 이상 결제 후, 영수증 인증하기
            </FieldText>
          </Section>

          <Section>
            <FieldTitle>미션 기간</FieldTitle>
            <FieldText>2025.08.01 ~ 08.15</FieldText>
          </Section>

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
