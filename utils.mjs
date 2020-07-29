import fs from "fs";
import openInEditor from "open-in-editor";

const editor = openInEditor.configure({
  cmd: "/usr/local/bin/code",
  pattern: "-r -g",
});

// Get current directories
export const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name);

// Returns a string of the full file path
export function generateColumnFilename(fileName) {
  return `${process.cwd()}/${fileName}/${fileName}.jsx`;
}

export const folders = getDirectories(process.cwd());

// Open file in VS Code
export function openFileInEditor(fileName) {
  editor.open(generateColumnFilename(fileName)).then(
    function () {
      console.log("Opening file in VS code...");
    },
    function (err) {
      console.error(chalk.red("Something went wrong: ") + err);
    },
  );
}

// Create folder
export function makeDirs(fileName) {
  fs.mkdirSync(`./${fileName}`, { recursive: true });
}
