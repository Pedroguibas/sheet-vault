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
    <button onClick={handleClick} className="sheet-card">
      <span className="character-name">{sheet.character.character_name}</span>
      <div className="character-info">
        <span className="character-class">
          {sheet.character.character_class}
        </span>
        <span className="character-race">{sheet.character.race}</span>
      </div>
    </button>
  );
};

export default SheetCard;
