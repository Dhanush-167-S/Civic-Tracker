require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/db");
const PORT = process.env.PORT || 3000;

connectToDB();

app.listen(() => {
  console.log(`Server is running at PORT : ${PORT}`);
});
