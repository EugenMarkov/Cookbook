module.exports = function isJSON(str) {
  try {
    const obj = JSON.parse(str);
    if (obj && typeof obj === "object" && obj !== null) {
      return true;
    }
  } catch (err) {}
  return false;
};
