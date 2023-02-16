const express = require("express");
const app = express();
const port = 8000;
const appRoute = require("./router/index");
const Word = require("./Model/Word");
const cors = require("cors");
const translate = require("translate-google");
const sqlite3 = require("sqlite3").verbose();

const sequelize = require("./database/database");
let db = new sqlite3.Database("./Database/dict_hh.sqlite");
let sql1 = `SELECT * FROM va`;
let sql2 = `SELECT * FROM av`;
app.use(
  express.json({ limit: "500mb", extended: true, parameterLimit: 102400 })
);
app.use(
  express.urlencoded({
    limit: "500mb",
    extended: true,
    parameterLimit: 102400,
  })
);
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.get("/", async (req, res) => {
  let data = [];
  db.all(sql1, [], async (err, rows) => {
    if (err) {
      throw err;
    }
    let data1 = [];
    data1 = rows.map((row) => {
      return {
        word: row.word,
        description: row.description,
        pronounce: row.pronounce,
        type: "va",
      };
    });
    data = [...data, ...data1];
    db.all(sql2, [], async (err, rows) => {
      if (err) {
        throw err;
      }
      let data2 = [];
      data2 = rows.map((row) => {
        return {
          word: row.word,
          description: row.description,
          pronounce: row.pronounce,
          type: "av",
        };
      });
      data = [...data, ...data2];
      for (let i = 0; i < data.length; i++) {
        let word = data[i];
        await Word.create({
          word: word.word,
          description: word.description,
          pronounce: word.pronounce,
          type: word.type,
        });
      }
      return res.status(200).json(data);
    });
  });
});
app.get("/api/tung", (req, res) => {
  res.send({ message: "Hello Tung" });
});

sequelize.sync({ force: false }).then(() => {
  console.log("Database is connected");
});
translate("我说中文", { from: "zh-cn", to: "vi" })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/api", appRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
