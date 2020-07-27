import { generate } from "./createComponent.mjs";
const args = process.argv.slice(2);
const userInput = args;

// Create multiple components
userInput.map((u) => generate(u));
