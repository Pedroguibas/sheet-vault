import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import CharacterInfo from "../Sheet/CharacterInfo";
import Ability from "../Sheet/Ability";
import SavingThrows from "../Sheet/SavingThrows";
import Skills from "../Sheet/Skills";
import SheetArrayItem from "../Sheet/SheetArrayItem";
import Combat from "../Sheet/Combat";
import AttacksAndSpellsArray from "../Sheet/AttacksAndSpellsArray";
import MoreInfo from "../Sheet/MoreInfo";
import type { SheetType } from "./MySheets";
import "../../assets/css/NewSheet.css";
import type { SessionType } from "../../App";

type NewSheetPropsType = {
  session: SessionType;
};

const NewSheet = ({ session }: NewSheetPropsType) => {
  if (!session) return <Navigate to={"/"} />;

  const navigate = useNavigate();
  const [sheet, setSheet] = useState<SheetType | undefined>({
    _id: "",
    player_id: session.userId,
    character: {
      character_name: "",
      character_class: "",
      level: 0,
      race: "",
      background: "",
      alignment: "",
      xp: 0,
      personality_trait: "",
      ideals: "",
      bonds: "",
      flaws: "",
      features_and_traits: [],
    },
    abilities: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    },
    passive_wisdom: 0,
    inspiration: 0,
    proficiency_bonus: 0,
    saving_throws: {
      saving_strength: false,
      saving_dexterity: false,
      saving_constitution: false,
      saving_intelligence: false,
      saving_wisdom: false,
      saving_charisma: false,
    },
    skills: {
      acrobatics: false,
      animal_handling: false,
      arcana: false,
      athletics: false,
      deception: false,
      history: false,
      insight: false,
      intimidation: false,
      investigation: false,
      medicine: false,
      nature: false,
      perception: false,
      performance: false,
      persuasion: false,
      religion: false,
      sleight_of_hand: false,
      stealth: false,
      survival: false,
    },
    other_proficiencies: [],
    combat: {
      armor_class: 0,
      initiative: 0,
      speed: 0,
      hp: {
        max_hp: 0,
        current_hp: 0,
        temporary_hp: 0,
        hp_dice: "",
      },
      death_saves: {
        successes: 0,
        failures: 0,
      },
      attacks_and_spells: [
        {
          attack_name: "",
          attack_bonus: 0,
          damage: "",
          damage_type: "",
        },
      ],
    },
    bag: {
      money: {
        cp: 0,
        sp: 0,
        ep: 0,
        gp: 0,
        pp: 0,
      },
      equipment: [],
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/sheets`, sheet);
      navigate("/minhasfichas");
    } catch (e) {
      console.error(e);
    }
  };

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
      let updated_proficiencies = [...prev!.other_proficiencies];
      updated_proficiencies[Number(e.target.id)] = e.target.value;

      return {
        ...prev!,
        other_proficiencies: updated_proficiencies,
      };
    });
  };

  const handleAddProficiency = (newProficiency: string) => {
    setSheet((prev) => {
      let updated_proficiencies = [...prev!.other_proficiencies];
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

  return (
    <section className="sheet-section section-container">
      <form className="sheet" onSubmit={handleSubmit}>
        <div className="salvar-btn-container">
          <button className="salvar-btn">Salvar</button>
        </div>
        <CharacterInfo sheet={sheet!} setSheet={setSheet} />
        <div className="sheet-abilities-and-skills">
          <div className="sheet-abilities">
            <Ability
              abilityName="Força"
              abilityId="strength"
              abilityValue={sheet!.abilities.strength}
              changeHandler={handleAbilityChange}
            />
            <Ability
              abilityName="Destreza"
              abilityId="dexterity"
              abilityValue={sheet!.abilities.dexterity}
              changeHandler={handleAbilityChange}
            />
            <Ability
              abilityName="Constituição"
              abilityId="constitution"
              abilityValue={sheet!.abilities.constitution}
              changeHandler={handleAbilityChange}
            />
            <Ability
              abilityName="Inteligência"
              abilityId="intelligence"
              abilityValue={sheet!.abilities.intelligence}
              changeHandler={handleAbilityChange}
            />
            <Ability
              abilityName="Sabedoria"
              abilityId="wisdom"
              abilityValue={sheet!.abilities.wisdom}
              changeHandler={handleAbilityChange}
            />
            <Ability
              abilityName="Carisma"
              abilityId="charisma"
              abilityValue={sheet!.abilities.charisma}
              changeHandler={handleAbilityChange}
            />
          </div>
          <div className="sheet-skills">
            <div className="sheet-inspiration">
              <input
                onChange={handleBaseNumberChange}
                id="inspiration"
                type="number"
                value={sheet!.inspiration}
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
                value={sheet!.proficiency_bonus}
                min={0}
                max={99}
              />
              <label className="proficiency-label" htmlFor="proficiency">
                Inspiração
              </label>
            </div>
            <SavingThrows sheet={sheet!} setSheet={setSheet} />
            <Skills sheet={sheet!} setSheet={setSheet} />
          </div>
          <div className="wisdom-and-proficiencies">
            <div className="passive-wisdom">
              <input
                onChange={handleBaseNumberChange}
                id="passive-wisdom"
                type="number"
                value={sheet!.passive_wisdom}
                min={0}
                max={99}
              />
              <label className="passive-wisdom-label" htmlFor="passive-wisdom">
                Sabedoria passiva
              </label>
            </div>
            <SheetArrayItem
              title="Outras Proeficiências"
              placeholder="Adicione uma proeficiência..."
              items={sheet!.other_proficiencies}
              fieldName="other_proficiencies"
              addHandler={handleAddProficiency}
              removeHandler={handleRemoveProficiency}
              changeHandler={handleOtherProficiencyChange}
            />
          </div>
        </div>
        <Combat sheet={sheet!} setSheet={setSheet} />
        <MoreInfo sheet={sheet!} setSheet={setSheet} />
        <AttacksAndSpellsArray sheet={sheet!} setSheet={setSheet} />
      </form>
    </section>
  );
};

export default NewSheet;
