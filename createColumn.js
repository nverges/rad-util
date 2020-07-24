// const snakeCase = require("lodash-es/snakeCase");
const fs = require("fs");
const args = process.argv.slice(2);
const chalk = require("chalk");
const openInEditor = require("open-in-editor");
const editor = openInEditor.configure({
  cmd: "/usr/local/bin/code",
  pattern: "-r -g",
});
const userInput = args[0];

// Text transformation utils
function snakeToCamel(str) {
  return str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", ""),
  );
}

function camelToSnake(string) {
  return string
    .replace(/[\w]([A-Z])/g, function (m) {
      return m[0] + "_" + m[1];
    })
    .toLowerCase();
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Generate filename
function generateColumnFilename(fileName) {
  return `${process.cwd()}/${fileName}/${fileName}.jsx`;
}

// Open file in VS Code
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

function columnTemplate(fileName) {
  return `import { MemoizedLabelColumn } from "spa/components/advanced_table_columns";
import PropTypes from "prop-types";
import React from "react";

export const ${snakeToCamel(`${userInput}_column`)} = {
  fused: false,
  hidden: false,
  key: "${snakeToCamel(userInput)}",
  label: "${capitalizeFirstLetter(snakeToCamel(fileName))}",
  width: 200,
  enabled: true,
  sort: true,
  sortActive: false,
  sortDirection: "asc",
  filter: false,
  filterActive: false,
  filterType: "EMPTY",
  filterValue: {},
};

export function ${capitalizeFirstLetter(
    snakeToCamel(fileName),
  )}({ ${snakeToCamel(fileName)} }) {
  return <MemoizedLabelColumn text={${snakeToCamel(fileName)}} />;
}

${capitalizeFirstLetter(snakeToCamel(fileName))}.propTypes = {
  ${snakeToCamel(fileName)}: PropTypes.string,
};
`;
}

// Create files
function generate(fileName) {
  makeDirs(fileName);

  try {
    // Create boilerplate column
    fs.writeFileSync(
      generateColumnFilename(fileName),
      columnTemplate(fileName),
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
