import type { SheetType } from "./pages/MySheets";
import "../assets/css/SheetCard.css";
import { useNavigate } from "react-router-dom";

type SheetCardPropsType = {
  sheet: SheetType;
};

const SheetCard = ({ sheet }: SheetCardPropsType) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ficha?sheet=${sheet._id}`);
  };

  return (
    <li className="sheet-card">
      <button onClick={handleClick}>
        <span className="character-name">
          {sheet.character.character_name == ""
            ? "Sem nome"
            : sheet.character.character_name}
        </span>
        <div className="character-info">
          <span className="character-class">
            {sheet.character.character_class == ""
              ? "Sem classe"
              : sheet.character.character_class}
          </span>
          <span className="character-race">
            {sheet.character.race == "" ? "Sem raça" : sheet.character.race}
          </span>
        </div>
      </button>
    </li>
  );
};

export default SheetCard;
