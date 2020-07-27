import { generate } from "./createColumn.mjs";
const args = process.argv.slice(2);
const userInput = args;

// Create multiple columns
const userLoop = userInput.map((u) => generate(u));
