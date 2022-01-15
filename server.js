const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/config");
const morgan = require("morgan");
const path = require("path");
require("colors");
const importData = require("./Seeder");
const port = process.env.PORT || 8080;
//config dotenv
dotenv.config();

//connection mongodb
connectDB();

//import data
importData();

const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));

//route
app.use("/api/pizzas", require("./routes/pizzaRoute"));
app.use("/api/users", require("./routes/UserRoutes"));
app.use("/api/orders", require("./routes/orderRoute"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("<h1>Hello From Node Server vai nodemon</h1>");
  });
}

app.listen(port, () => {
  console.log(
    `Server Running On ${process.env.NODE_ENV} mode on port no ${process.env.PORT}`
      .bgMagenta.white
  );
});
