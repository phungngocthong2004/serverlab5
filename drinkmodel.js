const mongoose = require("mongoose");

const DrinkSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const drinksModel = mongoose.model("dinks", DrinkSchema);

module.exports = drinksModel;
