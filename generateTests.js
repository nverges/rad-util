const { readdirSync } = require("fs");
const fs = require("fs");
const chalk = require("chalk");
// const { exec } = require("child_process");

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
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const folders = getDirectories(process.cwd());

// Map through folders and create test file
try {
  console.log(chalk.green("Success! Files created:"));
  folders.map((folder) => {
    fs.writeFileSync(`./${folder}/${folder}.test.jsx`, columnTemplate(folder)),
      console.log(chalk.blue(`./${folder}/${folder}.test.jsx`));
  });
} catch (err) {
  console.log(chalk.red("Please review your errors."));
  console.log(err);
}

// folders.map((folder) =>
//   exec(`npm test ${folder}`, (error, stdout, stderr) => {
//     if (error) {
//       console.log(`error: ${error.message}`);
//       return;
//     }
//     if (stderr) {
//       console.log(`stderr: ${stderr}`);
//       return;
//     }
//     console.log(`stdout: ${stdout}`);
//   }),
// );
