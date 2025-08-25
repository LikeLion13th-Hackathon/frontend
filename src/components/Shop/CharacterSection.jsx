import {
  CharacterStage,
  CharacterStageInner,
  CharacterImg,
  CharName,
  LevelBadge,
  CharNameRow,
  EditBtn
} from "../../styles/Shop/Shop.styles";
import { PiPencilSimpleFill } from "react-icons/pi";

export default function CharacterSection({
  name,
  level,
  imgSrc,
  editable = false,
  onEditName,
  variant = "grow",
  loading,
}) {
  return (
    <CharacterStage $variant={variant}>
      <CharacterStageInner $variant={variant}>
        <CharacterImg src={imgSrc} alt="" />
        <CharNameRow>
          <CharName>{name}</CharName>
          {editable && (
            <EditBtn type="button" onClick={onEditName}>
              <PiPencilSimpleFill size={20} />
            </EditBtn>
          )}
        </CharNameRow>
        <LevelBadge>Level {level}</LevelBadge>
      </CharacterStageInner>
    </CharacterStage>
  );
}