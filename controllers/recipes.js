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

  Recipe.find({ customerId: req.user.id })
    .populate("customerId")
    .then(recipes => res.json(recipes))
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
          message: `Product with id "${req.params.id}" is not found.`
        });
      } else {
        const recipeData = {};
        const recipeFields = _.cloneDeep(req.body);
        recipeData.description = [...recipe.description, recipeFields.description];


        const updatedRecipe = queryCreator(recipeData);
        console.log(updatedRecipe);

        await Recipe.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedRecipe },
          { new: true }
        )
          .populate("customerId")
          .then(recipe => {
            console.log(recipe);
          })
          .catch(err =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `
            })
          );

        Recipe.find({ customerId: req.user.id })
          .populate("customerId")
          .then(recipes => res.json(recipes))
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
  Recipe.find({ customerId: req.user.id })
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
        .then(deletedCount => console.log(deletedCount)
        )
        .catch(err =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `
          })
        );

      Recipe.find({ customerId: req.user.id })
        .populate("customerId")
        .then(recipes =>  res.status(200).json({
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


