const chat = require("../LLM");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  try {

    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        error: "question required"
      });
    }

    const response = await chat.sendMessage({
        message: question
    });

    res.json({
      answer: response.text
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "AI response error"
    });

  }
});

module.exports = router;