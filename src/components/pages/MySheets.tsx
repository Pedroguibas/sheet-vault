import { useEffect, useState } from "react";
import axios from "axios";
import SheetCard from "../SheetCard.tsx";
import type { SessionType } from "../../App.tsx";
import "../../assets/css/MySheets.css";
import { useNavigate } from "react-router-dom";

export type SheetType = {
  _id: string;
  player_id: string;
  character: {
    character_name: string;
    character_class: string;
    level: number;
    race: string;
    background: string;
    alignment: string;
    xp: number;
    personality_trait: string;
    ideals: string;
    bonds: string;
    flaws: string;
    features_and_traits: string[];
  };
  abilities: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  passive_wisdom: number;
  inspiration: number;
  proficiency_bonus: number;
  saving_throws: {
    saving_strength: boolean;
    saving_dexterity: boolean;
    saving_constitution: boolean;
    saving_intelligence: boolean;
    saving_wisdom: boolean;
    saving_charisma: boolean;
  };
  skills: {
    acrobatics: boolean;
    animal_handling: boolean;
    arcana: boolean;
    athletics: boolean;
    deception: boolean;
    history: boolean;
    insight: boolean;
    intimidation: boolean;
    investigation: boolean;
    medicine: boolean;
    nature: boolean;
    perception: boolean;
    performance: boolean;
    persuasion: boolean;
    religion: boolean;
    sleight_of_hand: boolean;
    stealth: boolean;
    survival: boolean;
  };
  other_proficiencies: string[];
  combat: {
    armor_class: number;
    initiative: number;
    speed: number;
    hp: {
      max_hp: number;
      current_hp: number;
      temporary_hp: number;
      hp_dice: string;
    };
    death_saves: {
      successes: number;
      failures: number;
    };
    attacks_and_spells: {
      attack_name: string;
      attack_bonus: number;
      damage: string;
      damage_type: string;
    }[];
  };
  bag: {
    money: {
      cp: number;
      sp: number;
      ep: number;
      gp: number;
      pp: number;
    };
    equipment: string[];
  };
};

type MySheetPropsType = {
  session: SessionType;
};

const MySheet = ({ session }: MySheetPropsType) => {
  const navigate = useNavigate();
  const [sheets, setSheets] = useState<SheetType[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/sheets/user/${
            session!.userId
          }`
        );

        setSheets(data);
      } catch (e) {
        console.error(e);
        setSheets([]);
      }
    };

    fetch();
  }, []);

  return (
    <section className="my-sheets-section">
      <h1>Minhas Fichas</h1>
      <div className="sheet-list-container section-container">
        <div className="nova-ficha-container">
          <button
            onClick={() => navigate("/novaficha")}
            className="nova-ficha-btn"
          >
            Nova Ficha
          </button>
        </div>
        {sheets.length > 0 ? (
          <ul className="sheet-list">
            {sheets.map((sheet, i) => (
              <SheetCard sheet={sheet} key={i} />
            ))}
          </ul>
        ) : (
          <div className="no-sheets-warning">
            <h2>Você não tem nenhuma ficha cadastrada :(</h2>
          </div>
        )}
      </div>
    </section>
  );
};

export default MySheet;
