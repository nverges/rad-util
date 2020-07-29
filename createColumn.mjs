const args = process.argv.slice(2);

import {
  camelToSnake,
  capitalizeFirstLetter,
  snakeToCamel,
} from "./textModifiers.mjs";
import {
  generateColumnFilename,
  makeDirs,
  openFileInEditor,
} from "./utils.mjs";

import chalk from "chalk";
import fs from "fs";

// User input
const userInput = args[0];

// Column content
export function columnTemplate(fileName) {
  return `import { MemoizedLabelColumn } from "spa/components/advanced_table_columns";
import PropTypes from "prop-types";
import React from "react";

export const ${snakeToCamel(`${fileName}_column`)} = {
  fused: false,
  hidden: false,
  key: "${snakeToCamel(fileName)}",
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
    openFileInEditor(fileName);
  } catch (err) {
    console.log(chalk.red("Please review your errors."));
    console.log(err);
  }
}

// Convert input to snake_case and Execute
generate(camelToSnake(userInput));
