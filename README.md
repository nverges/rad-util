# RAD Util
https://github.com/nverges/radutil
---

### createColumn.js
- Creates the scaffold for a a new table column
- For ultimate fanciness, add this script to your root directory and make an alias so you can run it from any index folder!


##### Setup
- Create a `scripts` directory in your root directory and clone this repo into it
- cd into `scripts` and run `npm install`
- Add the following line to your `.zshrc`:
  - `alias createColumn='node ~/scripts/createColumn.js'`
- Now, you can execute the script from any index directory to easily add a new column!
  - e.g. `spa/components/tasks/table_columns`

##### Usage
1. Navigate to `{indexName}/table_columns` directory
2. Run `createColumn {column_name}`
3. Does things
   - Creates file/folder structure
   - Adds import statement to `table_columns/index.js` 
   - Opens new file in VS Code
4. And you're done!