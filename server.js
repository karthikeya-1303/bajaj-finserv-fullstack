const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const FULL_NAME = "pendyala_koushik";  
const DOB = "13032005";        
const EMAIL = "jkoushikpendyala1303@gmail.com";  
const ROLL_NUMBER = "22BCE0991"; 

const isNumber = (str) => /^-?\d+$/.test(str);
const isAlphabet = (str) => /^[a-zA-Z]+$/.test(str);

const alternatingCapsReverse = (alphas) => {
  let combined = alphas.join("");
  let reversed = combined.split("").reverse().join("");
  let result = "";
  for (let i = 0; i < reversed.length; i++) {
    result += i % 2 === 0 ? reversed[i].toUpperCase() : reversed[i].toLowerCase();
  }
  return result;
};

app.post("/post", (req, res) => {
  try {
    const data = req.body.data;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input. Expected { data: [] }",
      });
    }

    let even_numbers = [];
    let odd_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    data.forEach((item) => {
      if (isNumber(item)) {
        const num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
      } else if (isAlphabet(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    });

    const concat_string = alternatingCapsReverse(alphabets);

    return res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (err) {
    return res.status(500).json({
      is_success: false,
      message: "Server error",
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
