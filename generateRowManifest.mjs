import {
  camelToSnake,
  capitalizeFirstLetter,
  snakeToCamel,
} from "./textModifiers.mjs";

import chalk from "chalk";
import { folders } from "./utils.mjs";
import fs from "fs";

const tableColumnsString = folders.map((folder) => getColumnName(folder));
const componentsString = folders.map((folder) => getComponentName(folder));

// Generate Component name
function getComponentName(fileName) {
  return capitalizeFirstLetter(snakeToCamel(fileName));
}

// Generate Column name
function getColumnName(fileName) {
  return snakeToCamel(`${fileName}_column`);
}

function getColumnKey(fileName) {
  return snakeToCamel(`${fileName}`);
}

function generateRenderManifest(renderManifest) {
  const renderManifestArray = renderManifest.map((r) => {
    return `${getColumnName(r)}: ${getComponentName(r)}`;
  });
  return renderManifestArray;
}
const renderManifest = generateRenderManifest(folders);

// Row Manifest Template
function rowManifestTemplate(fileName) {
  return `import { ${tableColumnsString}, ${componentsString} } from "./table_columns";

export const tableColumns = [${tableColumnsString}];

export const renderManifest = {
  ${renderManifest}
};
`;
}

// Map through folders and create test file
try {
  console.log("-----------------------");
  console.log(chalk.green("Success! Row Manifest generated."));
  folders.map((folder) => {
    fs.writeFileSync(`../row_manifest.js`, rowManifestTemplate(folder));
  });
} catch (err) {
  console.log(chalk.red("Please review your errors."));
  console.log(err);
  // return err;
}
