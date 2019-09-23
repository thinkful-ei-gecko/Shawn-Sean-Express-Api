'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

app.get('/sum', (req, res) => {
  let sum = parseInt(req.query.a) + parseInt(req.query.b);
  console.log(sum);
  res.send(`The sum of ${req.query.a} and ${req.query.b} is ${sum}`);
});


app.get('/cipher', (req, res) => {
  let text = req.query.text;
  let shift = parseInt(req.query.shift);
  let encryptedText = "";

  for (let i=0; i < text.length; i++){
    if (text[i] === text[i].toUpperCase()) {
      encryptedText += String.fromCharCode(
        ((text.charCodeAt(i) + shift - 65) % 26) + 65
      );
    }   
    else {
      encryptedText += String.fromCharCode(
        ((text.charCodeAt(i) + shift - 97) % 26) + 97
      );
    }
  }
  res.send(
    `The Ceasar Cipher of ${text} with the value of ${shift} is ... ${encryptedText}`
  );
})

app.get('/lotto', (req, res) => {
    let array = req.query.numbers;
    array = array.map(num => parseInt(num));
    let arrayCopy = req.query.numbers;
    let length = array.length;
    let newArray = [];
    let match = 0;
    //res.send(array);
    for (let i=0; i < length; i++) {
        newArray.push(Math.floor(Math.random()*(20) + 1));
    }
    for (let i=0; i < length; i++) {
        if (array[i]===newArray[i]) {
            match++;
        }
    }
    if (match < 4){
        res.send(`Sorry, you lose. You had ${match} matching numbers \n
        ${newArray}`);
    }
    if (match === 4){
        res.send("You've won a free ticket!");
    }
    if (match === 5){
        res.send("Congratulations! You just won 100$!!!");
    }
    else 
        res.send("Unbelievable! You could have won the mega millions!!");

});

app.listen(49443, () => console.log('Server on 49443'));