require("colors");
const Pizza = require("./models/pizzaModel");
const Pizzas = require("./data/pizza-data");

//import data
const importData = async () => {
  try {
    //delete existing data
    await Pizza.deleteMany();

    // await Pizza.insertMany(sampleData);
    await Pizza.insertMany(Pizzas);
    console.log("DATA IMPORTED".bgGreen.white);
  } catch (error) {
    console.log(`${error}`.bgRed.white);
  }
};

module.exports = importData;
