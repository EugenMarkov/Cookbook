const FormValidator = require("../validation/FormValidator");
const isJSON = require("./isJSON");

module.exports = function queryCreator(data) {
  return Object.keys(data).reduce((queryObject, param) => {
    if (isJSON(data[param])) {
      queryObject[param] = JSON.parse(data[param]);
    } else if (!FormValidator.isEmpty(data[param])) {
      queryObject[param] = data[param];
    }

    return queryObject;
  }, {});
};
