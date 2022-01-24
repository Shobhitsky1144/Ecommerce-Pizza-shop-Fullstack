const express = require("express");
const router = express.Router();
const pizzaModel = require("../models/pizzaModel");

//GET ALL PIZZA || @GET REQUEST
router.get("/getAllPizzas", async (req, res) => {
  try {
    const pizzas = await pizzaModel.find({});
    res.send(pizzas);
  } catch (error) {
    res.json({ message: error });
  }
});

//ADD PIZZA || @POST REQUEST --ADMIN
router.post("/addpizza", async (req, res) => {
  try {
    const newPizza = new pizzaModel({
      name: pizza.name,
      image: pizza.image,
      varients: ["small", "medium", "large"],
      description: pizza.description,
      category: pizza.category,
      prices: [pizza.prices],
    });
    await newPizza.save();
    res.status(201).send("New Pizza Added");
  } catch (error) {
    res.json({ message: error });
  }
});

//EDIT PIZZA || @POST REQUEST --ADMIN
router.post("/getpizzabyid", async (req, res) => {
  const { pizzaId } = req.body;
  try {
    const pizza = await pizzaModel.findOne({ _id: pizzaId });
    res.send(pizza);
  } catch (error) {
    res.json({ message: error });
  }
});

//UPDATE PIZZA || @POST REQUEST --ADMIN
router.post("/updatepizza", async (req, res) => {
  const { updatedPizza } = req.body;
  try {
    const pizza = await pizzaModel.findOne({ _id: updatedPizza._id });
    pizza.name = updatedPizza.name;
    pizza.description = updatedPizza.description;
    pizza.image = updatedPizza.image;
    pizza.category = updatedPizza.category;
    pizza.prices = [updatedPizza.prices];

    await pizza.save();
    res.status(200).send("Pizza Update Success");
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

//DELETE PIZZA || @POST REQUEST --ADMIN
router.post("/deletepizza", async (req, res) => {
  const { pizzaId } = req.body;
  try {
    await pizzaModel.findOneAndDelete({ _id: pizzaId });

    res.status(200).send("Pizza Deleted Successfully");
  } catch (error) {
    res.status(404).json({ message: error });
  }
});
module.exports = router;
