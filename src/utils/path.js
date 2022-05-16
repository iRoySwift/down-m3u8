const path = require("path");

const resolve = (uri) => {
  return path.resolve(__dirname, "..", uri);
};

module.exports = {
  resolve,
};
