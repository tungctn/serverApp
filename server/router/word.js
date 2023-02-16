const wordRoute = require("express").Router();

const WordController = require("../Controller/WordController");

wordRoute.post("/", WordController.createWord);
wordRoute.get("/", WordController.getWords);
wordRoute.get("/:id", WordController.getWord);
wordRoute.put("/:id", WordController.updateWord);
wordRoute.delete("/:id", WordController.deleteWord);
wordRoute.post("/translate", WordController.translateWord);

module.exports = wordRoute;
