const Recipe = require("../models/Recipe");

const uniqueRandom = require("unique-random");
const rand = uniqueRandom(0, 999);

const queryCreator = require("../commonHelpers/queryCreator");
const _ = require("lodash");


exports.addRecipe = async (req, res, next) => {
  const recipeFields = _.cloneDeep(req.body);

  recipeFields.itemNo = rand();

  try {
    recipeFields.name = recipeFields.name
      .toLowerCase()
      .trim()
      .replace(/\s\s+/g, " ");

  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `
    });
  }

  const updatedRecipe = queryCreator(recipeFields);

  const newRecipe = await new Recipe(updatedRecipe);
  await newRecipe.save();
  const newestRecipes = {"date": -1};
  Recipe.find({ customerId: req.user.id })
    .sort(newestRecipes)
    .populate("customerId")
    .then(recipes => res.status(200).json({
      message: `Recipe "${newRecipe.name}" is successfully added to DB`,
      recipes}))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.updateRecipe = (req, res, next) => {
  Recipe.findOne({ _id: req.params.id })
    .then( async recipe => {
      if (!recipe) {
        return res.status(400).json({
          message: `Recipe with id "${req.params.id}" is not found.`
        });
      } else {
        const recipeData = {};
        const recipeFields = _.cloneDeep(req.body);
        recipeData.description = [...recipe.description, recipeFields.description];


        const updatedRecipe = queryCreator(recipeData);

        await Recipe.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedRecipe },
          { new: true }
        )
          .populate("customerId")
          .then(recipe => {
            Boolean(recipe);
          })
          .catch(err =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `
            })
          );

        const newestRecipes = {"date": -1};
        Recipe.find({ customerId: req.user.id })
          .sort(newestRecipes)
          .populate("customerId")
          .then(recipes => res.status(200).json({
            message: `Recipe is successfully updated`,
            recipes}))
          .catch(err =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `
            })
          );
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.getRecipes = (req, res, next) => {
  const newestRecipes = {"date": -1};
  Recipe.find({ customerId: req.user.id })
    .sort(newestRecipes)
    .populate("customerId")
    .then(recipes => res.send(recipes))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.deleteRecipes = (req, res, next) => {
  Recipe.findOne({ _id: req.params.id }).then(async recipe => {
    if (!recipe) {
      return res
        .status(400)
        .json({ message: `Recipe with id ${req.params.id} is not found.` });
    } else {
      const recipeToDelete = await Recipe.findOne({ _id: req.params.id });

      await Recipe.deleteOne({ _id: req.params.id })
        .then(deletedCount => Boolean(deletedCount)
        )
        .catch(err =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `
          })
        );

      Recipe.find({ customerId: req.user.id })
      const newestRecipes = {"date": -1};
      Recipe.find({ customerId: req.user.id })
        .sort(newestRecipes)
        .populate("customerId")
        .then(recipes => res.status(200).json({
            message: `Recipe "${recipeToDelete.name}" is successfully deleted from DB`,
          recipes}))
        .catch(err =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `
          })
        );
    }
  });
};


