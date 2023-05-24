const axios = require("axios");

require("dotenv").config();

const crypto = require("crypto");
const ENC = "bf3c199c2470cb477d907b1e0917c17b";
const IV = "5183666c72eec9e4";
const ALGO = "aes-256-cbc";
const decrypt = (text) => {
  let decipher = crypto.createDecipheriv(ALGO, ENC, IV);
  let decrypted = decipher.update(text, "base64", "utf8");
  return decrypted + decipher.final("utf8");
};

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${decrypt(process.env.OPENAI_API_KEY)}`
  }
};

const getData = async (prom) => {
  const reqestBody = {
    model: "text-davinci-003",
    prompt: prom,
    max_tokens: 500,
    temperature: 0.1,
    n: 1
  };
  var answer;
  var iserror;
  const response = await axios
    .post("https://api.openai.com/v1/completions", reqestBody, config)
    .catch((error) => {
      iserror = true;
    });
  if (iserror) {
    answer = "OpenAI failed!";
  } else {
    const data = await response;
    answer = data.data.choices[0].text;
  }
  return answer;
};

module.exports = getData;
