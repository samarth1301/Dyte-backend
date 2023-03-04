import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db";
import Course from "../Course";

interface registered_courses{
    course: string,
    slots: string[]
}

interface StudentAttributes {
  id: string;
  name: string;
  password: string,
  registered_courses: registered_courses[]
}
export interface StudentInput extends Optional<StudentAttributes, "id"> {}
export interface StudentOutput extends Required<StudentAttributes> {}

class Student extends Model<StudentAttributes, StudentInput> implements StudentAttributes {
  public id!: string;
  public name!: string;
  public password!: string;
 public registered_courses!: registered_courses[];
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Student.init(
  {
    id: {
      type: DataTypes.STRING,
      
      primaryKey: true,
    },
    password:{
        type: DataTypes.STRING,
        defaultValue: "12345"
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registered_courses:{
        type: DataTypes.ARRAY(DataTypes.JSON)
    }
  },
  {
    timestamps: true,
    sequelize: sequelize,
    paranoid: true,
  }
);

// Faculty.belongsToMany(Course, { through: 'CourseFaculty' });
export default Student;
