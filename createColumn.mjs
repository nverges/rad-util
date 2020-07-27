const args = process.argv.slice(2);

import {
  camelToSnake,
  capitalizeFirstLetter,
  snakeToCamel,
} from "./textModifiers.mjs";

import chalk from "chalk";
import fs from "fs";
import { openFileInEditor } from "./utils.mjs";

// User input
const userInput = args[0];

const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name);

const folders = getDirectories(process.cwd());

// Create folder
export function makeDirs(fileName) {
  fs.mkdirSync(`./${fileName}`, { recursive: true });
}

// Returns a string of the full file path
export function generateColumnFilename(fileName) {
  return `${process.cwd()}/${fileName}/${fileName}.jsx`;
}

// Column content
export function columnTemplate(fileName) {
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

// Create/write files
export function generate(fileName) {
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
      `Filename: '${chalk.blue(camelToSnake(fileName))}'\n`,
      `Location: ${chalk.blue(generateColumnFilename(fileName))}`,
    );

    // Open file in VS Code
    // openFileInEditor(fileName);
  } catch (err) {
    console.log(chalk.red("Please review your errors."));
    console.log(err);
  }
}

// Convert input to snake_case and Execute
generate(camelToSnake(userInput));
