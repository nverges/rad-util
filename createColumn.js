// const snakeCase = require("lodash-es/snakeCase");
const fs = require("fs");
const args = process.argv.slice(2);
const chalk = require("chalk");
const openInEditor = require("open-in-editor");
const editor = openInEditor.configure({
  cmd: "/usr/local/bin/code",
  pattern: "-r -g",
});

// Extract input variable
const userInput = args[0];

// Generate filename
function generateColumnFilename(fileName) {
  return `${process.cwd()}/${fileName}/${fileName}.jsx`;
}

// Utility function to convert snake_case to camelCase
function snakeToCamel(str) {
  return str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", ""),
  );
}

// Utility function to convert camelCase to snake_case
function camelToSnake(string) {
  return string
    .replace(/[\w]([A-Z])/g, function (m) {
      return m[0] + "_" + m[1];
    })
    .toLowerCase();
}

function openFileInEditor(fileName) {
  editor.open(generateColumnFilename(fileName)).then(
    function () {
      console.log("Opening file in VS code...");
    },
    function (err) {
      console.error(chalk.red("Something went wrong: ") + err);
    },
  );
}

// Create directories
function makeDirs(fileName) {
  fs.mkdirSync(`./${fileName}`, { recursive: true });
}

// Create files
function generate(fileName) {
  makeDirs(fileName);

  try {
    // Create boilerplate column
    fs.writeFileSync(
      generateColumnFilename(fileName),
      `import { ModelDisplay } from "spa/components/model_display";
import PropTypes from "prop-types";
import React from "react";

export const ${snakeToCamel(`${userInput}_column`)} = {
  fused: true,
  hidden: false,
  key: "${snakeToCamel(userInput)}",
  label: "Job",
  width: 200,
  enabled: true,
  sort: true,
  sortActive: true,
  sortDirection: "asc",
  filter: false,
  filterActive: true,
  filterType: "EMPTY",
  filterMeta: [],
  filterValue: {},
  showToggles: true,
};
`,
    );

    // Create index.js file add import statement
    fs.writeFileSync(
      `${process.cwd()}/${fileName}/index.js`,
      `export * from "./${fileName}";\n`,
    );

    // Add import statement to table_columns/index.js
    fs.appendFileSync(
      `${process.cwd()}/index.js`,
      `export * from "./${fileName}";\n`,
    );

    // Success Message
    console.log(
      chalk.green(`Column created!\n`),
      `Filename: '${chalk.blue(camelToSnake(userInput))}'\n`,
      `Location: ${chalk.blue(generateColumnFilename(fileName))}`,
    );

    // Open file in VS Code
    openFileInEditor(fileName);
  } catch (err) {
    console.log(chalk.red("Please review your errors."));
    console.log(err);
  }
}

// Convert input to snake_case and Execute
generate(camelToSnake(userInput));
