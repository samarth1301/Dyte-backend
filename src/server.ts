import app from "./app";
import connectToDB from "./config/db";

const port =  3000;

app.listen(port, () => {
  connectToDB();
  console.log(`Server is up and running on port ${port}!\n`);
});
