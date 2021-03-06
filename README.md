# RAD Utilities
- Some utility scripts to spawn new Table Columns and Components faster
  - createColumn
  - createColumns
  - createComponent
  - createComponents
  - generateTests
  - generateRowManifest.mjs
---
*Notes*
*- Uses .mjs files because `type: "module"` is set in `package.json` so that we can use use ES6 exports/imports*
  *- Need to execute with `node --experimental-modules`*

## Setup
- Create the directory `~/scripts` and clone this repo into it
- cd into `~/scripts` and run `npm install`
- Add the following aliases to your `.zshrc` and restart your terminal:
  - `alias createColumn='node --experimental-modules ~/scripts/createColumn.mjs'`
  - `alias createColumns='node --experimental-modules ~/scripts/createColumns.mjs'`
  - `alias createComponent='node --experimental-modules ~/scripts/createComponent.mjs'`
  - `alias createComponents='node --experimental-modules ~/scripts/createComponents.mjs'`
  - `alias generateTests='node --experimental-modules ~/scripts/generateTests.mjs'`
  - `alias generateRowManifest='node-exp ~/rad-util/generateRowManifest.mjs'`
- Now, you can execute any of the above script from any index directory to easily add a single new column, multiple new columns, and generate test files!
  - e.g. index directory: `spa/components/tasks/table_columns`
---

### createColumn.mjs
- Scaffolds the folder structure for a new table column
- Navigate to `{indexName}/table_columns` directory
- Usage: `createColumn <column_name>`

- Does things:
   - Creates file/folder structure
   - Generates boilerplate column object and component
   - Adds import statement to `table_columns/index.js` 
   - Opens new file in VS Code

### createColumns.mjs
- Creates multiple table columns
- Usage: `createColumns <foo bar baz column_test new_column newer_column whoa this_is_neat>`

### generateTests.mjs
- Generates a test file for each folder in your current directory
- Usage: `generateTests`

### generateRowManifest.mjs
- Generates a row_manifest.js file based on the folders in the current directory
- Usage: Navigate to `{table}/table_columns` and run `generateRowManifest`

### createComponent.mjs
- Creates a default React component
- Usage: `createComponent <component_name>`

### createComponents.mjs
- Creates multiple React components
- Usage: `createComponents <component_name another_name foo bar baz test another last_one>`