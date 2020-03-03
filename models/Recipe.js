const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
  {
    itemNo: {
      type: String,
      required: true
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "customers"
    },
    name: {
      type: String,
      required: true
    },
    description: [
      {
        type: String,
        required: true
      }
    ],
    date: {
      type: Date,
      default: Date.now
    },
  },
  { strict: false }
);


module.exports = Recipe = mongoose.model("recipes", RecipeSchema);
