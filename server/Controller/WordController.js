const { da } = require("translate-google/languages");
const Word = require("../Model/Word");

module.exports.createWord = async (req, res) => {
  for (let i = 0; i < req.body.length; i++) {
    const data = req.body[i];
    const word = await Word.create({
      ...data,
    });
  }
  const words = await Word.findAll();
  return res.status(200).json({
    msg: "Word created successfully",
    word: words,
  });
};

module.exports.getWords = async (req, res) => {
  const words = await Word.findAll();
  return res.status(200).json({
    msg: "Words fetched successfully",
    words: words,
  });
};

module.exports.getWord = async (req, res) => {
  const word = await Word.findOne(req.params.id);
  return res.status(200).json({
    msg: "Word fetched successfully",
    word: word,
  });
};

module.exports.updateWord = async (req, res) => {
  const word = await Word.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  return res.status(200).json({
    msg: "Word updated successfully",
    word: word,
  });
};

module.exports.deleteWord = async (req, res) => {
  const word = await Word.destroy({
    where: {
      id: req.params.id,
    },
  });
  return res.status(200).json({
    msg: "Word deleted successfully",
    word: word,
  });
  // delete all words
  // const word = await Word.destroy({
  //   where: {},
  //   truncate: true,
  // });
  // return res.status(200).json({
  //   msg: "All words deleted successfully",
  //   word: word,
  // });
};

module.exports.translateWord = async (req, res) => {
  try {
    const { text } = req.body;
    const translated = await Word.findAll({ where: { word: text } });
    return res.status(200).json({
      success: true,
      msg: "Word translated successfully",
      data: translated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Word translated failed",
      data: error,
    });
  }
};
