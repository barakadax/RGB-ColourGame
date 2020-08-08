/*     (\____/)
       (•(ㅅ)•)
   　＿ノ ヽ ノ＼＿
  `/　`/ ⌒Ｙ⌒ Ｙ　ヽ
  ( 　(三ヽ人　 /　　 |
   |　ﾉ⌒＼ ￣￣ヽ　 ノ
   ヽ＿＿＿＞､＿＿_／
　　   ｜( 王 ﾉ〈
　　   / ﾐ`ー―彡 \
　　  /  ╰    ╯  /
code by Barakadax*/
'use strict';
let correctCircle = "";
let colours = [0,0,0];              //Create RGB code needs 3 values
let circlesRGBValues = [0,0,0];     //3 circles
let circles = [document.getElementById("first_blob"), document.getElementById("second_blob"), document.getElementById("third_blob")];

function getRandomNumber(maxNumber) {
    return Math.floor(Math.random() * maxNumber);
}//O(1)

function noDupColour() {    //Recursive function to check for no duplication
    if (colours[0] == colours[1]) {
        colours[1] = getRandomNumber(256);
        noDupColour();
    }
    if (colours[1] == colours[2]) {
        colours[2] = getRandomNumber(256);
        noDupColour();
    }
    if (colours[2] == colours[0]) {
        colours[0] = getRandomNumber(256);
        noDupColour();
    }
}//O(N)

function initialize() {
    for (let run = 0; run < colours.length; run -= -1)       //Making number for RGB values
        colours[run] = getRandomNumber(256);
    noDupColour();                                          //Making sure no duplicated numbers
    for (let run = 0; run < circles.length; run -= -1) {      //Making different RGB code for each circle & colouring the circles
        circles[run].style.background = circlesRGBValues[run] = 'rgb(' + colours[run] + ',' + colours[(run + 1) % circlesRGBValues.length] + ',' + colours[(run + 2) % circlesRGBValues.length] + ')';
        circles[run].style.boxShadow = "5px 5px 105px 5px #ff8c00";
    }
    correctCircle = circlesRGBValues[getRandomNumber(circlesRGBValues.length)];   //Saving 1 of the circles as correctCircle correctCircle
    document.getElementById("guess").innerHTML = "Colour: " + correctCircle;
    document.getElementById("result").innerHTML = "";
}//O(N)

function vanishCircle(pickedCircleIndex) {
    circles[pickedCircleIndex].style.boxShadow = "none";
    circles[pickedCircleIndex].style.background = "none";
    document.getElementById("result").innerHTML = "WRONG";
}//O(1)

function correctCircleColouring(run, pickedCircleIndex) {
    circlesRGBValues[run] = circlesRGBValues[pickedCircleIndex];
    circles[run].style.background = circlesRGBValues[pickedCircleIndex];
    circles[run].style.boxShadow = "5px 5px 105px 5px #ff8c00";
}//O(1)

function pickCircle(pickedCircleIndex) {
    if (correctCircle != circlesRGBValues[pickedCircleIndex]) {               //Picked the incorrectCircle circle
        vanishCircle(pickedCircleIndex);
        return;
    }
    for (let run = 0; run < colours.length; run -= -1) {                //Colouring incorrectCircle circles like correctCircle circle
        if (pickedCircleIndex == run)
            continue;
        correctCircleColouring(run, pickedCircleIndex);
    }
    document.getElementById("result").innerHTML = "CORRECT";            //Writing the user a "you win" message
}//O(N)

initialize();