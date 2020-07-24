# RAD Utilities
https://github.com/nverges/rad-util
---

### createColumn.js
- Creates the scaffold for a new table column
- For ultimate fanciness, add this script to your root directory and make an alias so you can run it from any index folder!


##### Setup
- Create the directory `~/scripts` and clone this repo into it
- cd into `~/scripts` and run `npm install`
- Add the following alias to your `.zshrc`:
  - `alias createColumn='node ~/scripts/createColumn.js'`
- Now, you can execute the script from any index directory to easily add a new column!
  - e.g. `spa/components/tasks/table_columns`

##### Usage
1. Navigate to `{indexName}/table_columns` directory
2. Run `createColumn <column_name>`
3. Does things
   - Creates file/folder structure
   - Generates boilerplate column hash and component
   - Adds import statement to `table_columns/index.js` 
   - Opens new file in VS Code
4. Add the hash and Component to your `renderManifest`
5. And you're done!


---
### generateTests.js
- Generates a test file for each folder in the `table_columns` directory
- Add the following alias to your `.zshrc`:
  - `alias generateTests='node ~/scripts/generateTests.js'`
- Navigate to your `table_columns` folder and run `generateTests`