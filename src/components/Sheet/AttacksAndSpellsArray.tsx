import React, { useState, type SetStateAction } from "react";
import { Trash } from "react-bootstrap-icons";
import "../../assets/css/AttacksAndSpellsArray.css";
import type { SheetType } from "../pages/MySheets";

type NewAttackType = {
  attack_name: string;
  attack_bonus: number;
  damage: string;
  damage_type: string;
};

type AttacksAndSpellsArrayPropsType = {
  sheet: SheetType;
  setSheet: React.Dispatch<SetStateAction<SheetType | undefined>>;
};

const AttacksAndSpellsArray = ({
  sheet,
  setSheet,
}: AttacksAndSpellsArrayPropsType) => {
  const [newAttack, setNewAttack] = useState<NewAttackType>({
    attack_name: "",
    attack_bonus: 0,
    damage: "",
    damage_type: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const Name = e.target.name as
      | "attack_name"
      | "attack_bonus"
      | "damage"
      | "damage_type";

    setSheet((prev) => {
      const oldAttacks = prev!.combat.attacks_and_spells;

      let updatedAttacks = [...oldAttacks];

      const updatedAttack = {
        ...updatedAttacks[Number(e.target.id)],
        [Name]:
          Name == "attack_bonus" ? Number(e.target.value) : e.target.value,
      };

      updatedAttacks[Number(e.target.id)] = updatedAttack;

      return {
        ...prev!,
        combat: {
          ...prev!.combat,
          attacks_and_spells: updatedAttacks,
        },
      };
    });
  };

  const handleAddClick = () => {
    setSheet((prev) => {
      let updated = [...prev!.combat.attacks_and_spells];
      updated.push(newAttack);

      return {
        ...prev!,
        combat: {
          ...prev!.combat,
          attacks_and_spells: updated,
        },
      };
    });

    setNewAttack({
      attack_name: "",
      attack_bonus: 0,
      damage: "",
      damage_type: "",
    });
  };

  const handleRemoveClick = (i: number) => {
    setSheet((prev) => {
      let updatedAttacks = [...prev!.combat.attacks_and_spells];
      updatedAttacks.splice(i, 1);

      return {
        ...prev!,
        combat: {
          ...prev!.combat,
          attacks_and_spells: updatedAttacks,
        },
      };
    });
  };

  const handleNewAttackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAttack((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name == "attack_bonus"
          ? Number(e.target.value)
          : e.target.value,
    }));
  };

  return (
    <section className="attacks-and-spells-section">
      <h2>Ataques e magias</h2>
      <div className="attacks-and-spells">
        <div className="attack attack-header">
          <span>Nome</span>
          <span>Bonus</span>
          <span>Dano</span>
          <span>Tipo</span>
          <span></span>
        </div>
        {sheet.combat.attacks_and_spells.map((a, i) => (
          <div className="attack" key={i}>
            <input
              type="text"
              value={a.attack_name}
              name="attack_name"
              id={i.toString()}
              onChange={handleChange}
            />
            <input
              type="number"
              value={a.attack_bonus}
              name="attack_bonus"
              id={i.toString()}
              onChange={handleChange}
            />
            <input
              type="text"
              value={a.damage}
              name="damage"
              id={i.toString()}
              onChange={handleChange}
            />
            <input
              type="text"
              value={a.damage_type}
              name="damage_type"
              id={i.toString()}
              onChange={handleChange}
            />
            <button onClick={() => handleRemoveClick(i)}>
              <Trash color="red" />
            </button>
          </div>
        ))}
        <div className="attack">
          <input
            type="text"
            value={newAttack.attack_name}
            name="attack_name"
            onChange={handleNewAttackChange}
          />
          <input
            type="number"
            value={newAttack.attack_bonus?.toString()}
            name="attack_bonus"
            onChange={handleNewAttackChange}
          />
          <input
            type="text"
            value={newAttack.damage?.toString()}
            name="damage"
            onChange={handleNewAttackChange}
          />
          <input
            type="text"
            value={newAttack.damage_type}
            name="damage_type"
            onChange={handleNewAttackChange}
          />
          <button onClick={handleAddClick}>Add</button>
        </div>
      </div>
    </section>
  );
};

export default AttacksAndSpellsArray;
