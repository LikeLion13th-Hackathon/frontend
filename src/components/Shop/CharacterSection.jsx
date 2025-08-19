import {
  CharacterStage,
  CharacterStageInner,
  CharacterImg,
  CharName,
  CharLevel,
  CharNameRow,
  EditBtn
} from "../../styles/Shop.styles";
import { PiPencilSimpleFill } from "react-icons/pi";
import BbiBasic from "../../assets/characters/bbi_basic.png";

export default function CharacterSection({ name = "삐약이", level = 3 }) {
  return (
    <CharacterStage>
      <CharacterStageInner>
        <CharacterImg src={BbiBasic} alt="캐릭터" />

        <CharNameRow>
          <CharName>{name}</CharName>
          <EditBtn onClick ={() => console.log("닉네임 편집")}>
            <PiPencilSimpleFill size={20} />
          </EditBtn>
        </CharNameRow>

        <CharLevel>Level {level}</CharLevel>
      </CharacterStageInner>
    </CharacterStage>
  );
}