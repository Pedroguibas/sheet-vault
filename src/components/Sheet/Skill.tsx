import type React from "react";
import "../../assets/css/Skill.css";

type SkillPropsType = {
  skillName: string;
  skillId: string;
  skillValue: boolean;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Skill = ({
  skillName,
  skillId,
  skillValue,
  changeHandler,
}: SkillPropsType) => {
  return (
    <li className="skill-checkbox">
      <input
        id={skillId}
        name={skillId}
        type="checkbox"
        checked={skillValue}
        onChange={changeHandler}
      />
      <label htmlFor={skillId}>{skillName}</label>
    </li>
  );
};

export default Skill;
