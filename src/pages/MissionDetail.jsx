// 미션 상세페이지
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
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
import { MISSION_CATEGORY } from "../constants/missionCategory";
import MapView from "../components/MapView";
import { Button } from "../components/Button";
import BbiLoc from "../assets/characters/BbiLoc.png";
import {
  ModalOverlay,
  ModalContent,
} from "../components/MissionDetail/ReceiptUpload";
import {
  fetchCustomMissionDetail,
  fetchRestaurantMissionDetail,
  fetchLandmarkMissionDetail,
  fetchSpecialtyMissionDetail,
  startMission,
  abandonMission,
} from "../api/mission";

// 상태 정규화 함수
const normalizeStatus = (status) => {
  switch (status) {
    case "READY":
      return "ready";
    case "IN_PROGRESS":
      return "inProgress";
    case "COMPLETED":
      return "completed";
    case "ABANDONED":
      return "abandoned";
    default:
      return "ready";
  }
};

function MissionDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [mission, setMission] = useState(null);
  const [addr, setAddr] = useState("");
  const [status, setStatus] = useState("ready");
  const [showConfirm, setShowConfirm] = useState(false);
  const KAKAO_KEY = process.env.REACT_APP_KAKAO_MAP_KEY?.trim() || "";

  const category = location.state?.category || "CUSTOM";

  // 미션 상세 불러오기
  useEffect(() => {
    const loadMission = async () => {
      try {
        const fetchers = {
          CUSTOM: fetchCustomMissionDetail,
          맞춤미션: fetchCustomMissionDetail,
          AI_CUSTOM: fetchCustomMissionDetail,
          AI_맞춤미션: fetchCustomMissionDetail,
          RESTAURANT: fetchRestaurantMissionDetail,
          지역맛집: fetchRestaurantMissionDetail,
          LANDMARK: fetchLandmarkMissionDetail,
          지역명소: fetchLandmarkMissionDetail,
          SPECIALTY: fetchSpecialtyMissionDetail,
          특산품: fetchSpecialtyMissionDetail,
        };

        const fetcher = fetchers[category];
        if (!fetcher) return console.error("Unknown category:", category);
        const data = await fetcher(id);

        const normalized = normalizeStatus(data.status);
        setMission({
          id: data.missionId,
          apiCategory: data.category,
          category: MISSION_CATEGORY[data.category]?.label || data.category,
          title: data.title,
          method: data.description,
          period: `${data.startDate} ~ ${data.endDate}`,
          reward: `${data.rewardPoint} 코인 지급`,
          status: normalized,
        });
        setStatus(normalized);
      } catch (err) {
        console.error("미션 상세 불러오기 실패:", err);
      }
    };

    loadMission();
  }, [id, category, location.key]);

  if (!mission) return <div>미션 정보를 불러오는 중...</div>;

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
              {status === "inProgress" && (
                <Badge style={{ backgroundColor: "#FF4E69" }}>진행 중</Badge>
              )}
              {status === "completed" && (
                <Badge style={{ backgroundColor: "#4CAF50" }}>완료됨</Badge>
              )}

              <Badge
                style={{
                  backgroundColor:
                    MISSION_CATEGORY[mission.apiCategory]?.badgeTextColor ||
                    "#999",
                }}
              >
                {MISSION_CATEGORY[mission.apiCategory]?.label ||
                  mission.apiCategory}
              </Badge>
              <Badge style={{ color: "#808080" }}>영수증 인증</Badge>
            </TagGroup>
          </TagRow>
          <Title>{mission.title}</Title>

          <Divider />

          <div style={{ position: "relative", width: "100%" }}>
            <MapView
              appKey={KAKAO_KEY}
              markerSrc={BbiLoc}
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

        {/* 버튼 영역 */}
        {(status === "ready" || status === "abandoned") && (
          <Button
            style={{ width: "100%" }}
            onClick={async () => {
              try {
                const updated = await startMission(id);
                const newStatus = normalizeStatus(updated.status);
                setMission({ ...mission, status: newStatus });
                setStatus(newStatus);
              } catch (err) {
                console.error("미션 시작 실패:", err);
              }
            }}
          >
            미션 시작하기
          </Button>
        )}

        {status === "inProgress" && (
          <>
            <Button
              style={{ width: "100%" }}
              onClick={() => {
                if (!mission?.id) {
                  console.error("missionId 없음:", mission);
                  alert("미션 ID를 불러오는 중입니다. 다시 시도해주세요.");
                  return;
                }
                navigate(`/receipt/upload/${mission.id}`);
              }}
            >
              영수증 인증하기
            </Button>
            <Button
              style={{ width: "100%", backgroundColor: "#FF4E69" }}
              onClick={() => setShowConfirm(true)}
            >
              미션 포기
            </Button>
          </>
        )}

        {status === "completed" && (
          <Button
            style={{ width: "100%", backgroundColor: "#4CAF50" }}
            disabled
          >
            완료된 미션
          </Button>
        )}
      </Container>

      {/* 포기 확인 모달 */}
      {showConfirm && (
        <ModalOverlay onClick={() => setShowConfirm(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h4 style={{ margin: "20px" }}>정말 미션을 포기하시겠어요?</h4>
            <Button
              onClick={async () => {
                try {
                  const updated = await abandonMission(id);
                  const newStatus = normalizeStatus(updated.status);
                  setMission({ ...mission, status: newStatus });
                  setStatus(newStatus);
                  setShowConfirm(false);
                  navigate("/mission");
                } catch (err) {
                  console.error("미션 포기 실패:", err);
                }
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
