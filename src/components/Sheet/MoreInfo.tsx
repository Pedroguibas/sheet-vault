import type { SetStateAction } from "react";
import "../../assets/css/MoreInfo.css";
import type { SheetType } from "../pages/MySheets";
import SheetArrayItem from "./SheetArrayItem";

type MoreInfoPropsType = {
  sheet: SheetType;
  setSheet: React.Dispatch<SetStateAction<SheetType | undefined>>;
};

const MoreInfo = ({ sheet, setSheet }: MoreInfoPropsType) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSheet((prev) => ({
      ...prev!,
      character: {
        ...prev!.character,
        personality_trait: e.target.value,
      },
    }));
  };

  const handleFeatureChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSheet((prev) => {
      let updatedFeatures = [...prev!.character.features_and_traits];
      updatedFeatures[Number(e.target.id)] = e.target.value;

      return {
        ...prev!,
        character: {
          ...prev!.character,
          features_and_traits: updatedFeatures,
        },
      };
    });
  };

  const handleAddFeature = (newFeature: string) => {
    setSheet((prev) => {
      let updatedFeatures = [...prev!.character.features_and_traits];
      updatedFeatures.push(newFeature);

      return {
        ...prev!,
        character: {
          ...prev!.character,
          features_and_traits: updatedFeatures,
        },
      };
    });
  };

  const handleRemoveFeature = (i: number) => {
    setSheet((prev) => {
      let updatedFeatures = [...prev!.character.features_and_traits];
      updatedFeatures.splice(i, 1);

      return {
        ...prev!,
        character: {
          ...prev!.character,
          features_and_traits: updatedFeatures,
        },
      };
    });
  };

  return (
    <div className="more-info">
      <div className="info-container personality-trait">
        <textarea
          className="more-info-textarea"
          name="personality_trait"
          id="personality_trait"
          value={sheet.character.personality_trait}
          onChange={handleChange}
        />
        <label htmlFor="personality_trait ideals">Traço de personalidade</label>
      </div>
      <div className="info-container ideals">
        <textarea
          className="more-info-textarea"
          name="ideals"
          id="ideals"
          value={sheet.character.ideals}
          onChange={handleChange}
        />
        <label htmlFor="ideals">Ideais</label>
      </div>
      <div className="info-container bonds">
        <textarea
          className="more-info-textarea"
          name="bonds"
          id="bonds"
          value={sheet.character.bonds}
          onChange={handleChange}
        />
        <label htmlFor="bonds">Ligações</label>
      </div>
      <div className="info-container flaws">
        <textarea
          className="more-info-textarea"
          name="flaws"
          id="flaws"
          value={sheet.character.flaws}
          onChange={handleChange}
        />
        <label htmlFor="flaws">Defeitos</label>
      </div>
      <SheetArrayItem
        placeholder="Adicionar habilidade"
        items={sheet.character.features_and_traits}
        title="Características e habilidades"
        fieldName="features_and_traits"
        changeHandler={handleFeatureChange}
        addHandler={handleAddFeature}
        removeHandler={handleRemoveFeature}
      />
    </div>
  );
};

export default MoreInfo;
