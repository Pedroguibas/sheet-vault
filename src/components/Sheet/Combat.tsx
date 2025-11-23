import Bag from "./Bag";
import type { SetStateAction } from "react";
import type { SheetType } from "../pages/MySheets";
import "../../assets/css/Combat.css";

type CombatPropsType = {
  sheet: SheetType;
  setSheet: React.Dispatch<SetStateAction<SheetType | undefined>>;
};

const Combat = ({ sheet, setSheet }: CombatPropsType) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSheet((prev) => ({
      ...prev!,
      combat: {
        ...prev!.combat,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleHPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSheet((prev) => ({
      ...prev!,
      combat: {
        ...prev!.combat,
        hp: {
          ...prev!.combat.hp,
          [e.target.name]: e.target.value,
        },
      },
    }));
  };

  const handleDeathSaveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const Name = e.target.name as "successes" | "failures";

    setSheet((prev) => ({
      ...prev!,
      combat: {
        ...prev!.combat,
        death_saves: {
          ...prev!.combat.death_saves,
          [Name]:
            e.target.checked ||
            Number(e.target.value) < prev!.combat.death_saves[Name]
              ? Number(e.target.value)
              : 0,
        },
      },
    }));
  };

  return (
    <div className="sheet-combat">
      <div className="combat-first-line">
        <div className="armor-class">
          <label htmlFor="armor_class">CA</label>
          <input
            type="number"
            value={sheet.combat.armor_class}
            name="armor_class"
            id="armor_class"
            onChange={handleChange}
          />
        </div>
        <div className="initiative">
          <label htmlFor="initiative">Iniciativa</label>
          <input
            type="number"
            value={sheet.combat.initiative}
            name="initiative"
            id="initiative"
            onChange={handleChange}
          />
        </div>
        <div className="speed">
          <label htmlFor="speed">Desloc.</label>
          <input
            type="number"
            value={sheet.combat.speed}
            name="speed"
            id="speed"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="hp">
        <div className="max-hp">
          <label htmlFor="max_hp">PV máximo</label>
          <input
            type="number"
            id="max_hp"
            name="max_hp"
            value={sheet.combat.hp.max_hp}
            onChange={handleHPChange}
          />
        </div>
        <div className="current-hp">
          <input
            type="number"
            id="current_hp"
            name="current_hp"
            value={sheet.combat.hp.current_hp}
            onChange={handleHPChange}
          />
          <label htmlFor="current_hp">PV atual</label>
        </div>
      </div>
      <div className="temp-hp">
        <input
          type="number"
          id="temporary_hp"
          name="temporary_hp"
          value={sheet.combat.hp.temporary_hp}
          onChange={handleHPChange}
        />
        <label htmlFor="temporary_hp">PV temporário</label>
      </div>
      <div className="death-saves-container">
        <div className="hp-dice">
          <label htmlFor="hp_dice">Dados de vida</label>
          <input
            type="text"
            id="hp_dice"
            name="hp_dice"
            value={sheet.combat.hp.hp_dice}
            onChange={handleHPChange}
          />
        </div>
        <div className="death-saves">
          <h2>testes contra morte</h2>
          <label htmlFor="successes">Sucessos</label>
          <div className="successes">
            <input
              type="checkbox"
              value={1}
              name="successes"
              checked={sheet.combat.death_saves.successes > 0}
              onChange={handleDeathSaveChange}
            />
            <input
              type="checkbox"
              value={2}
              name="successes"
              checked={sheet.combat.death_saves.successes > 1}
              onChange={handleDeathSaveChange}
            />
            <input
              type="checkbox"
              value={3}
              name="successes"
              checked={sheet.combat.death_saves.successes > 2}
              onChange={handleDeathSaveChange}
            />
          </div>
          <label htmlFor="failures">Falhas</label>
          <div className="failures">
            <input
              type="checkbox"
              value={1}
              name="failures"
              checked={sheet.combat.death_saves.failures > 0}
              onChange={handleDeathSaveChange}
            />
            <input
              type="checkbox"
              value={2}
              name="failures"
              checked={sheet.combat.death_saves.failures > 1}
              onChange={handleDeathSaveChange}
            />
            <input
              type="checkbox"
              value={3}
              name="failures"
              checked={sheet.combat.death_saves.failures > 2}
              onChange={handleDeathSaveChange}
            />
          </div>
        </div>
      </div>
      <Bag sheet={sheet} setSheet={setSheet} />
    </div>
  );
};

export default Combat;
