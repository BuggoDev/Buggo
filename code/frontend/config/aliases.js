const fs = require("fs");
const paths = JSON.parse(fs.readFileSync("./config/paths.json")).compilerOptions
  .paths;

const aliases = (prefix = "src") =>
  Object.keys(paths)
    .filter((path) => paths[path].length == 1)
    .reduce((aList, path) => {
      aList[path] = `${prefix}/${paths[path][0]}`;
      return aList;
    }, {});

module.exports = aliases;
