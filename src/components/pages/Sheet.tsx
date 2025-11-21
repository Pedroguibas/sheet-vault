import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import Ability from "../Sheet/Ability.tsx";
import Skills from "../Sheet/Skills.tsx";
import SavingThrows from "../Sheet/SavingThrows.tsx";
import type { SheetType } from "./MySheets.tsx";
import type { SessionType } from "../../App.tsx";
import type React from "react";
import "../../assets/css/Sheet.css";
import SheetArrayItem from "../Sheet/SheetArrayItem.tsx";
import CharacterInfo from "../Sheet/CharacterInfo.tsx";

type SheetPropsType = {
  session: SessionType;
};

const Sheet = ({ session }: SheetPropsType) => {
  const navigate = useNavigate();
  const [sheet, setSheet] = useState<SheetType>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchSheet = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/sheets/${searchParams.get(
          "sheet"
        )}`
      );
      if (data.player_id != session!.userId) navigate("/");

      setSheet(data);
    };

    fetchSheet();
  }, []);

  const handleAbilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) >= 0 && Number(e.target.value) <= 99) {
      setSheet((prev) => ({
        ...prev!,
        abilities: {
          ...prev!.abilities,
          [e.target.name]: Number(e.target.value),
        },
      }));
    }
  };

  const handleBaseStringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSheet((prev) => ({
      ...prev!,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBaseNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) >= 0 && Number(e.target.value) <= 99) {
      setSheet((prev) => ({
        ...prev!,
        [e.target.name]: Number(e.target.value),
      }));
    }
  };

  const handleOtherProficiencyChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setSheet((prev) => {
      const updated_proficiencies = [...prev!.other_proficiencies];
      updated_proficiencies[Number(e.target.id)] = e.target.value;

      return {
        ...prev!,
        other_proficiencies: updated_proficiencies,
      };
    });
  };

  const handleAddProficiency = (newProficiency: string) => {
    setSheet((prev) => {
      const updated_proficiencies = [...prev!.other_proficiencies];
      updated_proficiencies.push(newProficiency);

      return {
        ...prev!,
        other_proficiencies: updated_proficiencies,
      };
    });
  };

  const handleRemoveProficiency = (i: number) => {
    setSheet((prev) => {
      let updated_proficiencies = [...prev!.other_proficiencies];
      updated_proficiencies.splice(i, 1);

      return {
        ...prev!,
        other_proficiencies: updated_proficiencies,
      };
    });
  };

  if (sheet) {
    return (
      <section className="sheet-section section-container">
        <div className="sheet">
          <CharacterInfo sheet={sheet} setSheet={setSheet} />
          <div className="sheet-abilities-and-skills">
            <div className="sheet-abilities">
              <Ability
                abilityName="Força"
                abilityId="strength"
                abilityValue={sheet.abilities.strength}
                changeHandler={handleAbilityChange}
              />
              <Ability
                abilityName="Destreza"
                abilityId="dexterity"
                abilityValue={sheet.abilities.dexterity}
                changeHandler={handleAbilityChange}
              />
              <Ability
                abilityName="Constituição"
                abilityId="constitution"
                abilityValue={sheet.abilities.constitution}
                changeHandler={handleAbilityChange}
              />
              <Ability
                abilityName="Inteligência"
                abilityId="intelligence"
                abilityValue={sheet.abilities.intelligence}
                changeHandler={handleAbilityChange}
              />
              <Ability
                abilityName="Sabedoria"
                abilityId="wisdom"
                abilityValue={sheet.abilities.wisdom}
                changeHandler={handleAbilityChange}
              />
              <Ability
                abilityName="Carisma"
                abilityId="charisma"
                abilityValue={sheet.abilities.charisma}
                changeHandler={handleAbilityChange}
              />
            </div>
            <div className="sheet-skills">
              <div className="sheet-inspiration">
                <input
                  onChange={handleBaseNumberChange}
                  id="inspiration"
                  type="number"
                  value={sheet.inspiration}
                  min={0}
                  max={99}
                />
                <label className="inspiration-label" htmlFor="inspiration">
                  Inspiração
                </label>
              </div>
              <div className="sheet-proficiency">
                <input
                  onChange={handleBaseNumberChange}
                  id="proficiency"
                  type="number"
                  value={sheet.proficiency_bonus}
                  min={0}
                  max={99}
                />
                <label className="proficiency-label" htmlFor="proficiency">
                  Inspiração
                </label>
              </div>
              <SavingThrows sheet={sheet} setSheet={setSheet} />
              <Skills sheet={sheet} setSheet={setSheet} />
            </div>
            <div className="wisdom-and-proficiencies">
              <div className="passive-wisdom">
                <input
                  onChange={handleBaseNumberChange}
                  id="passive-wisdom"
                  type="number"
                  value={sheet.passive_wisdom}
                  min={0}
                  max={99}
                />
                <label
                  className="passive-wisdom-label"
                  htmlFor="passive-wisdom"
                >
                  Sabedoria passiva
                </label>
              </div>
              <SheetArrayItem
                title="Outras Proeficiências"
                placeholder="Adicione uma proeficiência..."
                items={sheet.other_proficiencies}
                fieldName="other_proficiencies"
                addHandler={handleAddProficiency}
                removeHandler={handleRemoveProficiency}
                changeHandler={handleOtherProficiencyChange}
              />
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return <h1>Ficha não encontrada...</h1>;
  }
};

export default Sheet;
