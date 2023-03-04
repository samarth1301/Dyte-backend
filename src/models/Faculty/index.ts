import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db";
import Course from "../Course";

interface FacultyAttributes {
  id: string;
  name: string;
  course: string[];
}
export interface FacultyInput extends Optional<FacultyAttributes, "id"> {}
export interface FacultyOutput extends Required<FacultyAttributes> {}

class Faculty extends Model<FacultyAttributes, FacultyInput> implements FacultyAttributes {
  public id!: string;
  public name!: string;
  public course !: string[];
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Faculty.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course:{
      type: DataTypes.ARRAY(DataTypes.STRING)
    }
  },
  {
    timestamps: true,
    sequelize: sequelize,
    paranoid: true,
  }
);

// Faculty.belongsToMany(Course, { through: 'CourseFaculty' });
export default Faculty;
