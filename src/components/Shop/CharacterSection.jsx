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
  const showMeta = variant === "grow";

  return (
    <CharacterStage $variant={variant} aria-busy={!!loading}>
      <CharacterStageInner $variant={variant}>
        <CharacterImg src={imgSrc} alt="" />

        {showMeta && (
          <CharNameRow>
            <CharName>{name}</CharName>
            {editable && (
              <EditBtn type="button" onClick={onEditName}>
                <PiPencilSimpleFill size={20} />
              </EditBtn>
            )}
          </CharNameRow>
        )}

        {showMeta && <LevelBadge>Level {level}</LevelBadge>}
      </CharacterStageInner>
    </CharacterStage>
  );
}