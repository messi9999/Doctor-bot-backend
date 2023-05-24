const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
// const request = require("request");
const http = require("http");
const getData = require("../func/openaicom");
const { title } = require("process");
const artRouter = express.Router();

// POST
artRouter.post("/", async (req, res) => {
  const question = req.body.question;
  const info = req.body.info;
  const prompt ="From now on, you only give the doctor's answers. I am " + info.age + " years old, " + "weight " + info.weight + " pounds, " 
      + "height " + info.heightA + " feet " + info.heightB + " inches. " + "Nowadays, I have a " + info.symptoms
      + ". I can't take " + info.medications + " because I have " + info.medications + ". "
      + "Also, the body temperature is " + info.temperature + " degrees, the heart rate is " + info.heartRate
      + " bpm, the oxygen saturation is " + info.oxygenPro + " %, and the respiratory rate is " + info.breathRate
      + " breaths per minute." + "\n" + question
  const result = await getData(prompt)
  res.status(201).send({
    answers: result,
  });
  // res.status(201).send({
  //   message: "hello"
  // })
});

module.exports = artRouter;
