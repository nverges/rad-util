// const snakeCase = require("lodash-es/snakeCase");
const fs = require("fs");
const args = process.argv.slice(2);

// Utility function to convert snake_case to camelCase
const snakeToCamel = (str) =>
  str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", ""),
  );

// Create directories
function makeDirs(fileName) {
  fs.mkdirSync(`./${fileName}`, { recursive: true });
}

// Create files
function generate(fileName) {
  makeDirs(fileName);

  // Create boilerplate component
  fs.writeFileSync(
    `${process.cwd()}/${fileName}/${fileName}.jsx`,
    `import { ModelDisplay } from "spa/components/model_display";
import PropTypes from "prop-types";
import React from "react";

export const ${snakeToCamel(`${args[0]}_column`)} = {};

`,
  );

  // Create index.js file and import component
  fs.writeFileSync(
    `${process.cwd()}/${fileName}/index.js`,
    `export * from "./${fileName}";\n`,
  );

  // Add import statement to table_columns/index.js
  fs.appendFileSync(
    `${process.cwd()}/index.js`,
    `export * from "./${fileName}";\n`,
  );
}

// Execute
// generate(snakeCase(args[0]));
generate(args[0]);
