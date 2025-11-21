import Skill from "./Skill";
import type React from "react";
import type { SheetType } from "../pages/MySheets";

type SkillsPropsType = {
  sheet: SheetType;
  setSheet: React.Dispatch<React.SetStateAction<SheetType | undefined>>;
};

const Skills = ({ sheet, setSheet }: SkillsPropsType) => {
  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSheet((prev) => ({
      ...prev!,
      skills: {
        ...prev!.skills,
        [e.target.name]: e.target.checked,
      },
    }));
  };

  return (
    <div className="skills">
      <h2>Habilidades</h2>
      <ul className="skills-list">
        <Skill
          skillName="Acrobacia"
          skillId={"acrobatics"}
          skillValue={sheet.skills.acrobatics}
          changeHandler={handleSkillChange}
        />
        <Skill
          skillName="Arcanismo"
          skillId={"arcana"}
          skillValue={sheet.skills.arcana}
          changeHandler={handleSkillChange}
        />
        <Skill
          skillName="Atletismo"
          skillId={"athletics"}
          skillValue={sheet.skills.athletics}
          changeHandler={handleSkillChange}
        />
        <Skill
          skillName="Atuação"
          skillId={"performance"}
          skillValue={sheet.skills.performance}
          changeHandler={handleSkillChange}
        />
        <Skill
          skillName="Blefar"
          skillId={"deception"}
          skillValue={sheet.skills.deception}
          changeHandler={handleSkillChange}
        />
        <Skill
          skillName="Furtividade"
          skillId={"stealth"}
          skillValue={sheet.skills.stealth}
          changeHandler={handleSkillChange}
        />
        <Skill
          skillName="História"
          skillId={"history"}
          skillValue={sheet.skills.history}
          changeHandler={handleSkillChange}
        />
        <Skill
          skillName="Intimidação"
          skillId={"intimidation"}
          skillValue={sheet.skills.intimidation}
          changeHandler={handleSkillChange}
        />
        <Skill
          skillName="Intuição"
          skillId={"insight"}
          skillValue={sheet.skills.insight}
          changeHandler={handleSkillChange}
        />
        <Skill
          skillName="Investigação"
          skillId={"investigation"}
          skillValue={sheet.skills.investigation}
          changeHandler={handleSkillChange}
        />
        <Skill
          skillName="Lidar com Animais"
          skillId={"animal_handling"}
          skillValue={sheet.skills.animal_handling}
          changeHandler={handleSkillChange}
        />
        <Skill
          skillName="Medcina"
          skillId={"medicine"}
          skillValue={sheet.skills.medicine}
          changeHandler={handleSkillChange}
        />
        <Skill
          skillName="Natureza"
          skillId={"nature"}
          skillValue={sheet.skills.nature}
          changeHandler={handleSkillChange}
        />
        <Skill
          skillName="Percepção"
          skillId={"perception"}
          skillValue={sheet.skills.perception}
          changeHandler={handleSkillChange}
        />
        <Skill
          skillName="Persuasão"
          skillId={"persuasion"}
          skillValue={sheet.skills.persuasion}
          changeHandler={handleSkillChange}
        />
        <Skill
          skillName="Prestidigitação"
          skillId={"sleight_of_hand"}
          skillValue={sheet.skills.sleight_of_hand}
          changeHandler={handleSkillChange}
        />
        <Skill
          skillName="Religião"
          skillId={"religion"}
          skillValue={sheet.skills.religion}
          changeHandler={handleSkillChange}
        />
        <Skill
          skillName="Sobrevivência"
          skillId={"survival"}
          skillValue={sheet.skills.survival}
          changeHandler={handleSkillChange}
        />
      </ul>
    </div>
  );
};

export default Skills;
