import type React from "react";
import "../../assets/css/Ability.css";

type AbilityPropsType = {
  abilityName: string;
  abilityId: string;
  abilityValue: number;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Ability = ({
  abilityName,
  abilityId,
  abilityValue,
  changeHandler,
}: AbilityPropsType) => {
  return (
    <div className="ability-container">
      <label className="ability-name" htmlFor={abilityId}>
        {abilityName}
      </label>
      <input
        className="ability-input"
        type="number"
        id={abilityId}
        name={abilityId}
        value={String(abilityValue).padStart(2, "0")}
        max={99}
        min={0}
        pattern="\d{2}"
        maxLength={2}
        onChange={changeHandler}
      />
    </div>
  );
};

export default Ability;
