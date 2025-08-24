import {
  Avatar,
  XPHeader,
  XPTitles,
  LevelEm,
  XPName,
  XPPercent,
  XPBar,
  XPFill,
  XPSub,
  LevelBlock,
  XPSection,
} from "../../styles/Shop/GrowTab.styles";
import defaultProfile from "../../assets/default-profile.png";

export default function LevelInfo({ profileImage, levelText, titleText, percent }) {
  const clamped = Math.max(0, Math.min(100, Number(percent) || 0));
  const remain = +(100 - clamped).toFixed(1);

  const subText =
    remain <= 0
      ? "100% 완료! 다음 레벨로 진화시켜주세요"
      : `다음 레벨까지 ${remain}%`;

  return (
    <LevelBlock>
      <Avatar>
        <img src={profileImage || defaultProfile} alt="" loading="lazy" />
      </Avatar>

      <XPSection>
        <XPHeader>
          <XPTitles>
            <LevelEm>{levelText}</LevelEm>
            <XPName>{titleText}</XPName>
          </XPTitles>
          <XPPercent>{clamped.toFixed(1)}%</XPPercent>
        </XPHeader>

        <XPBar>
          <XPFill $value={clamped} />
        </XPBar>

        <XPSub>{subText}</XPSub>
      </XPSection>
    </LevelBlock>
  );
}