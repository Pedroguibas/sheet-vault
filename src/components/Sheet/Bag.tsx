import SheetArrayItem from "./SheetArrayItem";
import type { SetStateAction } from "react";
import type { SheetType } from "../pages/MySheets";

type BagPropsType = {
  sheet: SheetType;
  setSheet: React.Dispatch<SetStateAction<SheetType | undefined>>;
};

const Bag = ({ sheet, setSheet }: BagPropsType) => {
  const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSheet((prev) => ({
      ...prev!,
      bag: {
        ...prev!.bag,
        money: {
          ...prev!.bag.money,
          [e.target.name]: e.target.value,
        },
      },
    }));
  };

  const handleEquipmentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSheet((prev) => {
      let updatedEquipmentList = [...prev!.bag.equipment];
      updatedEquipmentList[Number(e.target.id)] = e.target.value;

      return {
        ...prev!,
        bag: {
          ...prev!.bag,
          equipment: updatedEquipmentList,
        },
      };
    });
  };

  const handleRemoveEquipment = (i: number) => {
    setSheet((prev) => {
      let updatedEquipmentList = [...prev!.bag.equipment];
      updatedEquipmentList.splice(i, 1);

      return {
        ...prev!,
        bag: {
          ...prev!.bag,
          equipment: updatedEquipmentList,
        },
      };
    });
  };

  const handleAddEquipment = (newEquipment: string) => {
    setSheet((prev) => {
      let updatedEquipmentList = [...prev!.bag.equipment];
      updatedEquipmentList.push(newEquipment);

      return {
        ...prev!,
        bag: {
          ...prev!.bag,
          equipment: updatedEquipmentList,
        },
      };
    });
  };

  return (
    <>
      <div className="money">
        <div>
          <label htmlFor="cp">CP</label>
          <input
            type="number"
            id="cp"
            name="cp"
            value={sheet.bag.money.cp}
            onChange={handleMoneyChange}
          />
        </div>
        <div>
          <label htmlFor="sp">SP</label>
          <input
            type="number"
            id="sp"
            name="sp"
            value={sheet.bag.money.sp}
            onChange={handleMoneyChange}
          />
        </div>
        <div>
          <label htmlFor="ep">EP</label>
          <input
            type="number"
            id="ep"
            name="ep"
            value={sheet.bag.money.ep}
            onChange={handleMoneyChange}
          />
        </div>
        <div>
          <label htmlFor="gp">GP</label>
          <input
            type="number"
            id="gp"
            name="gp"
            value={sheet.bag.money.gp}
            onChange={handleMoneyChange}
          />
        </div>
        <div>
          <label htmlFor="pp">PP</label>
          <input
            type="number"
            id="pp"
            name="pp"
            value={sheet.bag.money.pp}
            onChange={handleMoneyChange}
          />
        </div>
      </div>
      <SheetArrayItem
        placeholder="Novo equipamento..."
        title="Equipamentos"
        items={sheet.bag.equipment}
        fieldName={"equipment"}
        changeHandler={handleEquipmentChange}
        removeHandler={handleRemoveEquipment}
        addHandler={handleAddEquipment}
      />
    </>
  );
};

export default Bag;
