import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Ability from "../Sheet/Ability.tsx";
import type { SheetType } from "./MySheets.tsx";
import type React from "react";
import "../../assets/css/Sheet.css";

const initialSheet: SheetType = {
  _id: "",
  player_id: "",
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
    features_and_traits: "",
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
    attacks_and_spells: [],
  },
  bag: {
    money: { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 },
    equipment: [],
  },
};

const Sheet = () => {
  const [sheet, setSheet] = useState<SheetType>(initialSheet);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchSheet = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/sheets/${searchParams.get(
          "sheet"
        )}`
      );
      setSheet(data);
    };

    fetchSheet();
  }, []);

  const handleAbilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) >= 0 && Number(e.target.value) <= 99) {
      setSheet((prev: SheetType) => ({
        ...prev,
        abilities: {
          ...prev.abilities,
          [e.target.name]: Number(e.target.value),
        },
      }));
    }
  };

  if (sheet) {
    return (
      <section className="sheet-section section-container">
        <div className="sheet">
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
          </div>
        </div>
      </section>
    );
  } else {
    return <h1>Ficha não encontrada...</h1>;
  }
};

export default Sheet;
