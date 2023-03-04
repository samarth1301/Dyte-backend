import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db";

interface Timings{
    day:string;
    start:Date;
    end:Date;
}

interface SlotAttributes {
  id: string;
timings:Timings[];
}
export interface SlotInput extends Required<SlotAttributes> {}
export interface SlotOutput extends Required<SlotAttributes> {}

class Slot
  extends Model<SlotAttributes, SlotInput>
  implements SlotAttributes
{
  public id!: string;
  public timings!:Timings[];
}

Slot.init(
  {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      timings:{
        type: DataTypes.ARRAY(DataTypes.JSON)
      }
   
  },
  {
    timestamps: true,
    sequelize: sequelize,
    paranoid: true,
  }
);

export default Slot;
