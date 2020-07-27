export function snakeToCamel(str) {
  return str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", ""),
  );
}

export function camelToSnake(string) {
  return string
    .replace(/[\w]([A-Z])/g, function (m) {
      return m[0] + "_" + m[1];
    })
    .toLowerCase();
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
