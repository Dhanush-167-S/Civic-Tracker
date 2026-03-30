const dataUriParser = require("datauri/parser");
const path = require("path");

const parser = new dataUriParser();

const getDataUri = (file) => {
  const extname = path.extname(file.originalname).toString();
  return parser.format(extname, file.buffer);
};

module.exports = getDataUri;
