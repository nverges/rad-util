import openInEditor from "open-in-editor";

const editor = openInEditor.configure({
  cmd: "/usr/local/bin/code",
  pattern: "-r -g",
});

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

export function generateColumnFilename(fileName) {
  return `${process.cwd()}/${fileName}/${fileName}.jsx`;
}
