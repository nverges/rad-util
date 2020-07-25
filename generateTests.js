const fs = require("fs");
const chalk = require("chalk");
let evens = [];
let odds = [];

// Text transformation utilities
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function snakeToCamel(str) {
  return str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", ""),
  );
}

// Generate Component name
function getComponentName(fileName) {
  return capitalizeFirstLetter(snakeToCamel(fileName));
}

// Generate Column name
function getColumnName(fileName) {
  return snakeToCamel(`${fileName}_column`);
}

function columnTemplate(fileName) {
  return `import { ${getComponentName(fileName)}, ${getColumnName(
    fileName,
  )} } from "./${snakeToCamel(fileName)}";
  
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

// Returns an array of all folders in current directory
const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

// const folders = getDirectories(process.cwd());
folders = ["jobs", "assignee"];

// Map through folders and create test file
try {
  folders.map((folder) => {
    fs.writeFileSync(`./${folder}/${folder}.test.jsx`, columnTemplate(folder)),
      console.log(chalk.blue(`./${folder}/${folder}.test.jsx`));
  });
  console.log(chalk.green("Success! Tests created:"));
} catch (err) {
  console.log(chalk.red("Please review your errors."));
  console.log(err);
}

// let evens = [];
// let odds = [];
folders.map((folder) =>
  fs.readFile(`./${folder}/${folder}.jsx`, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }

    const regex = data.match(/(\w+)(?=.*isRequired)/g);
    const regexFiltered = regex.filter((r) => r != "PropTypes");

    const splitArray = regexFiltered.filter((r) =>
      regexFiltered.indexOf(r) % 2 == 0 ? evens.push(r) : odds.push(r),
    );
    console.log("splitArray ", splitArray);
    console.log("keys ", evens);
    console.log("types ", odds);
    return [evens, odds];
  }),
);

// folders.map((folder) =>
//   fs.readFile(`./${folder}/${folder}.jsx`, "utf8", function (err, data) {
//     if (err) {
//       return console.log(err);
//     }

//     const regex = data.match(/(\w+)(?=.*isRequired)/g);
//     const regexFiltered = regex.filter((r) => r != "PropTypes");

//     const splitArray = regexFiltered.map((r) =>
//       regexFiltered.indexOf(r) % 2 == 0 ? evens.push(r) : odds.push(r),
//     );
//     // console.log("splitArray ", splitArray);
//     console.log("keys ", evens);
//     console.log("types ", odds);
//     return [evens, odds];
//   }),
// );
// console.log("evens ", evens);
