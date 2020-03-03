const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  addRecipe,
  updateRecipe,
  getRecipes,
  deleteRecipes,
} = require("../controllers/recipes");


router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  addRecipe,
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateRecipe
);

router.get("/", passport.authenticate("jwt", { session: false }), getRecipes);


router.delete("/:id", passport.authenticate("jwt", { session: false }), deleteRecipes);


module.exports = router;
