import { DataTypes, Model, Optional } from "sequelize";
// import { sequelize } from "../../config/db";
import { Sequelize } from "sequelize";
import Faculty from "../Faculty";
import Slot from "../Slots";

const db_url = "postgres://postgres:admin@localhost:5432/postgres";
const sequelize = new Sequelize(db_url);
interface CourseAttributes {
  id: number;
  name: string;
  course_type: string;
  faculties: string[];
  allowed_slots: string[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface CourseInput extends Optional<CourseAttributes, "id"> {}
export interface CourseOutput extends Required<CourseAttributes> {}

class Course
  extends Model<CourseAttributes, CourseInput>
  implements CourseAttributes
{
  public id!: number;
 public name !: string;
 public course_type!: string;
 public faculties!: string[];
 public allowed_slots!: string[];
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Course.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name:{
        type: DataTypes.STRING
    },
    course_type:{
        type: DataTypes.STRING
    },
    faculties:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    allowed_slots:{
        type: DataTypes.ARRAY(DataTypes.STRING)
    }

  },
  {
    timestamps: true,
    sequelize,
    paranoid: true,
  }
);

// define the many-to-many association with Faculty
// Course.belongsToMany(Faculty, { through: 'CourseFaculty' });

export default Course;
