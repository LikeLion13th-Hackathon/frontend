// ���������� ĳ����ī��
import styled from "styled-components";

// ��ü ī��, ���̾�
const Card = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
  aspect-ratio: 4 / 3;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
`;

const BgImg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background: ${(p) => p.$bg || "#f6f7f9"};
  background-size: cover;
  background-position: center;
  pointer-events: none;
`;

// ��� ���� �ö󰡴� ����
const Content = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3vh;
`;

// ���� / �̸� / �����
const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LevelBadge = styled.span`
  background: #f2c21a;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 999px;
  margin-right: 1vh;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25);
`;

const ProgressWrap = styled.div`
  width: 100%;
  height: 12px;
  background: #e9eef4;
  border-radius: 999px;
  overflow: hidden;
  margin-top: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25);
`;

const ProgressBar = styled.div`
  width: ${(p) => Math.max(0, Math.min(100, p.$value))}%;
  height: 100%;
  font-size: 10px;
  background: #f2c21a;
`;

// ĳ����
const Character = styled.img`
  align-self: center;
  width: 55%;
`;

export default function CharacterCard({
  bg,
  levelText = "Level 3",
  name = "�߾���",
  progress = 87.2,
  characterSrc,
  onClick,
}) {
  return (
    <Card
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.()}
    >
      {" "}
      <BgImg $bg={bg} />
      <Content>
        <div>
          <TopRow>
            <LevelBadge>{levelText}</LevelBadge>
            <span style={{ fontWeight: 600, marginRight: "18vh" }}>{name}</span>
            <span style={{ fontSize: "12px" }}>{progress.toFixed(1)}%</span>
          </TopRow>
          <ProgressWrap>
            <ProgressBar $value={progress} />
          </ProgressWrap>
        </div>
        {characterSrc && <Character src={characterSrc} />}
      </Content>
    </Card>
  );
}
