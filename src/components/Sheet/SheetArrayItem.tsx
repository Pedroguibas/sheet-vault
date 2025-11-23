import { useState } from "react";
import { Trash } from "react-bootstrap-icons";
import "../../assets/css/SheetArrayItem.css";

type SheetArrayItemPropsType = {
  changeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  removeHandler: (i: number) => void;
  addHandler: (item: string) => void;
  fieldName: string;
  placeholder: string;
  items: string[];
  title: string;
};

const SheetArrayItem = ({
  changeHandler,
  removeHandler,
  addHandler,
  fieldName,
  placeholder,
  items,
  title,
}: SheetArrayItemPropsType) => {
  const [newItem, setNewItem] = useState("");

  const handleAddClick = () => {
    addHandler(newItem);
    setNewItem("");
  };

  return (
    <div className="sheet-array-item">
      <h2>{title}</h2>
      {items.map((p, i) => (
        <div className="sheet-array-item-item-container" key={i}>
          <textarea
            className="sheet-textarea"
            name={fieldName}
            id={String(i)}
            value={p}
            onChange={changeHandler}
          />
          <button
            onClick={() => removeHandler(i)}
            className="remove-sheet-array-item-btn"
          >
            <Trash color="red" />
          </button>
        </div>
      ))}
      <textarea
        className="sheet-textarea"
        placeholder={placeholder}
        name={`new_${fieldName}_textarea`}
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={handleAddClick} className="add-sheet-array-item-btn">
        adicionar
      </button>
    </div>
  );
};

export default SheetArrayItem;
