import Skill from "./Skill";
import type { SheetType } from "../pages/MySheets";
import type React from "react";

type SavingThrowsPropsType = {
  sheet: SheetType;
  setSheet: React.Dispatch<React.SetStateAction<SheetType | undefined>>;
};

const SavingThrows = ({ sheet, setSheet }: SavingThrowsPropsType) => {
  const handleSavingThrowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSheet((prev) => ({
      ...prev!,
      saving_throws: {
        ...prev!.saving_throws,
        [e.target.name]: e.target.checked,
      },
    }));
  };

  return (
    <div className="saving-throws">
      <h2>Testes de Resistência</h2>
      <ul className="saving-list">
        <Skill
          skillName="Força"
          skillId="saving_strength"
          skillValue={sheet.saving_throws.saving_strength}
          changeHandler={handleSavingThrowChange}
        />
        <Skill
          skillName="Destreza"
          skillId="saving_dexterity"
          skillValue={sheet.saving_throws.saving_dexterity}
          changeHandler={handleSavingThrowChange}
        />
        <Skill
          skillName="Constituição"
          skillId="saving_constitution"
          skillValue={sheet.saving_throws.saving_constitution}
          changeHandler={handleSavingThrowChange}
        />
        <Skill
          skillName="inteligência"
          skillId="saving_intelligence"
          skillValue={sheet.saving_throws.saving_intelligence}
          changeHandler={handleSavingThrowChange}
        />
        <Skill
          skillName="Sabedoria"
          skillId="saving_wisdom"
          skillValue={sheet.saving_throws.saving_wisdom}
          changeHandler={handleSavingThrowChange}
        />
        <Skill
          skillName="Carisma"
          skillId="saving_charisma"
          skillValue={sheet.saving_throws.saving_charisma}
          changeHandler={handleSavingThrowChange}
        />
      </ul>
    </div>
  );
};

export default SavingThrows;
