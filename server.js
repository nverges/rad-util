import express from "express";
const app = express();
const PORT = 3000;

app.get("/", (req, res) => res.send("Jello World!"));

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`),
);
