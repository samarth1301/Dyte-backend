import { Sequelize } from "sequelize";
import Course from "../../models/Course";

const db_url = "postgres://postgres:admin@localhost:5432/postgres";
export const sequelize = new Sequelize(db_url);
import Faculty from "../../models/Faculty";
import Slot from "../../models/Slots";


const connectToDB = async () => {
  try {
    await sequelize.authenticate();

    //ASSOCIATIONS
    // Station.hasMany(Vehicle, {
    //   foreignKey: "StationId",
    // });
    // Vehicle.belongsTo(Station);
    // Booking.belongsTo(User, {
    //   foreignKey: "UserId",
    //   as: "user",
    // });
    // Booking.belongsTo(Vehicle, {
    //   foreignKey: "VehicleId",
    //   as: "vehicle",
    // });
    Course.belongsToMany(Faculty,{through:"CourseFaculty"});
    Faculty.belongsToMany(Course,{through:"CourseFaculty"});
    await sequelize.sync({ alter: true });


    //SYNCING ALL THE MODELS
    // await Station.sync({ alter: true });
    // await Vehicle.sync({ alter: true });
    // await User.sync({ alter: true });
    // await Booking.sync({ alter: true });
    await Faculty.sync({alter:true});
    await Slot.sync({alter:true});
    // await Course.sync({alter:true});
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connectToDB;
