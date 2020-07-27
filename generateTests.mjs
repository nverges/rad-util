import {
  camelToSnake,
  capitalizeFirstLetter,
  snakeToCamel,
} from "./textModifiers.mjs";

import chalk from "chalk";
import fs from "fs";

// Generate Component name
function getComponentName(fileName) {
  return capitalizeFirstLetter(snakeToCamel(fileName));
}

// Generate Column name
function getColumnName(fileName) {
  return snakeToCamel(`${fileName}_column`);
}

// Find required PropTypes and inject into template
let keys = [];
let types = [];
let splitArray = [];

function addKey(key) {
  keys.push(key);
  return keys;
}

function addType(type) {
  types.push(type);
  return types;
}

// Map propTypes
function propTypeMapper(type) {
  switch (type) {
    case "string":
      return `""`;
    case "object":
      return "{{}}";
    case "func":
      return "{() => {}}";
    default:
      return `""`;
  }
}

// Build string to append to Component
function buildPropTypesString([{ key, type }]) {
  return `${key}=${propTypeMapper(type)} `;
}

// 1. Loop through columns in current directory
// 2. Do a regex search for required PropTypes and inject them into generated Test file
function getPropTypes(fileName) {
  fs.readFile(`./${fileName}/${fileName}.jsx`, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }

    const regex = data.match(/(\w+)(?=.*isRequired)/g);
    const regexFiltered = !!regex ? regex.filter((r) => r != "PropTypes") : "";

    const modifiedSplitArray = !!regexFiltered
      ? regexFiltered.map((r) =>
          regexFiltered.indexOf(r) % 2 == 0 ? addKey(r) : addType(r),
        )
      : "-";

    // Need splitArray to be an array of objects [{ key, type }]
    // console.log("before ", splitArray);
    splitArray.push(modifiedSplitArray);
    // console.log(chalk.yellow("after modifiedSplitArray ", modifiedSplitArray));
    // console.log(chalk.yellow("after splitArray ", modifiedSplitArray));
    // return splitArray;
  });
  // Need splitArray TO BE IN SCOPE RIGHT HERE SOMEHOW... AND THIS WILL WORK!
  // console.log(chalk.red("PropTypes not added."));
  return "";
  // return buildPropTypesString([
  //   { key: "SWEET", type: "func" },
  //   { key: "foo", type: "bar" },
  // ]);
  // console.log(
  //   chalk.green(`Success! PropTypes automatically added to ${fileName}:`),
  // );
  // convert to an array of objects that accept a [{ key, type }]
  // return buildPropTypesString([{ testProp: "string" }]);
}

// Test file
function columnTemplate(fileName) {
  return `import { ${getComponentName(fileName)}, ${getColumnName(
    fileName,
  )} } from "./${camelToSnake(fileName)}";

import React from "react";
import { createShallow } from "@material-ui/core/test-utils";

describe("<${getComponentName(fileName)} />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  describe("default { ${getColumnName(
    fileName,
  )} } export for the application.", () => {
    it("Should match the snapshot.", () => {
      expect(${getColumnName(fileName)}).toMatchSnapshot();
    });
  });

  it("Should render the <${getComponentName(fileName)} /> column.", () => {
    const wrapper = shallow(<${getComponentName(fileName)} />);
    expect(wrapper).toMatchSnapshot();
  });
});
`;
}

// ${getPropTypes(
//     fileName,
//   )}
// Returns an array of all folders in current directory
const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name);

const folders = getDirectories(process.cwd());

// Map through folders and create test file
try {
  console.log("-----------------------");
  console.log(chalk.green("Success! Tests created:"));
  folders.map((folder) => {
    fs.writeFileSync(`./${folder}/${folder}.test.jsx`, columnTemplate(folder)),
      console.log(chalk.blue(`./${folder}/${folder}.test.jsx`));
  });
  console.log("-----------------------");
} catch (err) {
  console.log(chalk.red("Please review your errors."));
  console.log(err);
  // return err;
}
