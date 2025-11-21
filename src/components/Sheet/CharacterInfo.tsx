import "../../assets/css/CharacterInfo.css";
import type { SheetType } from "../pages/MySheets";
import type { SetStateAction } from "react";
import type React from "react";

type CharacterInfoPropsType = {
  sheet: SheetType;
  setSheet: React.Dispatch<SetStateAction<SheetType | undefined>>;
};

const CharacterInfo = ({ sheet, setSheet }: CharacterInfoPropsType) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSheet((prev) => ({
      ...prev!,
      character: {
        ...prev!.character,
        [e.target.name]: e.target.value,
      },
    }));
  };

  return (
    <div className="character-info">
      <div className="character-name">
        <div className="character-info-input-container">
          <label htmlFor="character_name">Nome:</label>
          <input
            type="text"
            value={sheet.character.character_name}
            name="character_name"
            id="character_name"
            onChange={handleChange}
          />
        </div>
        <div className="character-info-input-container">
          <label htmlFor="level">Nível:</label>
          <input
            type="number"
            value={sheet.character.level}
            name="level"
            id="level"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="character-info-col">
        <div className="character-info-input-container">
          <label htmlFor="level">Classe:</label>
          <input
            type="text"
            value={sheet.character.character_class}
            name="character_class"
            id="character_class"
            onChange={handleChange}
          />
        </div>
        <div className="character-info-input-container">
          <label htmlFor="level">Raça:</label>
          <input
            type="text"
            value={sheet.character.race}
            name="race"
            id="race"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="character-info-col">
        <div className="character-info-input-container">
          <label htmlFor="level">Antecedente:</label>
          <input
            type="text"
            value={sheet.character.background}
            name="background"
            id="background"
            onChange={handleChange}
          />
        </div>
        <div className="character-info-input-container">
          <label htmlFor="level">Tendência:</label>
          <input
            type="text"
            value={sheet.character.alignment}
            name="alignment"
            id="alignment"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="character-info-col">
        <div className="character-info-input-container">
          <label htmlFor="level">Exp:</label>
          <input
            type="text"
            value={sheet.character.xp}
            name="xp"
            id="xp"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CharacterInfo;
