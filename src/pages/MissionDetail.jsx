import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header, BackIcon } from "../styles/MyPage.styles";
import {
  Container,
  Card,
  TagRow,
  TagGroup,
  Badge,
  Title,
  Divider,
  LocationPill,
  LocEm,
  Section,
  FieldTitle,
  FieldText,
} from "../styles/MissionDetail.styles";
import MapView from "../components/MapView";
import { Button } from "../components/Button";
import BbiBasic from "../assets/characters/bbi_basic.png";
import {
  ModalOverlay,
  ModalContent,
} from "../components/MissionDetail/ReceiptUpload";

function MissionDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [mission, setMission] = useState(null);
  const [addr, setAddr] = useState("");
  const [status, setStatus] = useState("ready"); // 미션 진행 상태
  const [showConfirm, setShowConfirm] = useState(false);
  const KAKAO_KEY = process.env.REACT_APP_KAKAO_MAP_KEY?.trim() || "";

  // 임시: 나중에는 API 연동!!!!!!!!!
  useEffect(() => {
    const mockMissions = [
      {
        id: "1",
        category: "맞춤미션",
        title: "00동 음식점에서 7000원 이상 결제하기",
        method: "00동 음식점에서 7000원 이상 결제 후, 영수증 인증하기",
        period: "2025.08.01 ~ 08.15",
        reward: "200코인 지급",
      },
      {
        id: "2",
        category: "지역명소",
        title: "ㅁㅁ구 박물관 방문하기",
        method: "박물관 입장 후 인증샷 업로드",
        period: "2025.08.05 ~ 08.20",
        reward: "300코인 지급",
      },
    ];

    const found = mockMissions.find((m) => m.id === id);
    setMission(found || null);
  }, [id]);

  if (!mission) return <div>아직 더미데이터라 추가안함</div>;

  return (
    <div style={{ padding: "2vh", paddingTop: "1vh" }}>
      <Header>
        <BackIcon size={20} onClick={() => navigate(-1)} />
        <h3>미션</h3>
      </Header>

      <Container>
        <Card>
          <TagRow>
            <TagGroup>
              {status === "inProgress" && (
                <Badge style={{ backgroundColor: "#FF4E69" }}>진행 중</Badge>
              )}
              <Badge>{mission.category}</Badge>
              <Badge>영수증 인증</Badge>
            </TagGroup>
          </TagRow>
          <Title>{mission.title}</Title>

          <Divider />

          <div style={{ position: "relative", width: "100%" }}>
            <MapView
              appKey={KAKAO_KEY}
              markerSrc={BbiBasic}
              onAddressChange={({ address }) => setAddr(address)}
            />
            <LocationPill
              style={{
                position: "absolute",
                left: 6,
                top: 6,
                color: "#79797B",
              }}
            >
              <LocEm>나의 위치</LocEm> | {addr || "확인 중…"}
            </LocationPill>
          </div>

          <Section>
            <FieldTitle>미션 방법</FieldTitle>
            <FieldText>{mission.method}</FieldText>
          </Section>

          <Section>
            <FieldTitle>미션 기간</FieldTitle>
            <FieldText>{mission.period}</FieldText>
          </Section>

          <Section style={{ marginBottom: "8vh" }}>
            <FieldTitle>혜택</FieldTitle>
            <FieldText>{mission.reward}</FieldText>
          </Section>
        </Card>

        {status === "ready" && (
          <Button
            style={{ width: "100%" }}
            onClick={() => setStatus("inProgress")}
          >
            미션 시작하기
          </Button>
        )}

        {status === "inProgress" && (
          <>
            <Button
              style={{ width: "100%" }}
              onClick={() => navigate("/receipt/upload")}
            >
              영수증 인증하기
            </Button>
            <Button
              style={{
                width: "100%",
                backgroundColor: "#FF4E69",
              }}
              onClick={() => {
                setShowConfirm(true);
              }}
            >
              미션 포기
            </Button>
          </>
        )}
      </Container>

      {/* 포기 확인 모달 */}
      {showConfirm && (
        <ModalOverlay onClick={() => setShowConfirm(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h4 style={{ margin: "20px" }}>정말 미션을 포기하시겠어요?</h4>
            <Button
              onClick={() => {
                setStatus("ready");
                setShowConfirm(false);
              }}
            >
              포기하기
            </Button>
            <Button
              style={{
                backgroundColor: "#EBF0F7",
                color: "#808080",
                margin: "1.4vh",
              }}
              onClick={() => setShowConfirm(false)}
            >
              취소
            </Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
}

export default MissionDetail;
