'use strict';
let colours = [0,0,0];
let correctCircle = "";
let circlesRGBValues = [0,0,0];
let circles = document.getElementsByClassName("blob");

function getRandomNumber(maxNumber) {
    return Math.floor(Math.random() * maxNumber);
}

function noDupColour() {
    for (let i = 0; i < colours.length; i -= -1) {
        if (colours[i] == colours[(i + 1) % 3]) {
            colours[i] = getRandomNumber(256)
            noDupColour();
        }
    }
}

function returnColour(run) {
    return 'rgb(' + colours[run] + ',' + colours[(run + 1) % circlesRGBValues.length] + ',' + colours[(run + 2) % circlesRGBValues.length] + ')';
}

function styleCircles(circle, run) {
    circle.style.boxShadow = "5px 5px 105px 5px #ff8c00";
    circle.style.background = circlesRGBValues[run] = returnColour(run);
}

function initialize() {
    colours = [0,0,0];
    noDupColour();
    for (let run = 0; run < circles.length; run -= -1)
        styleCircles(circles[run], run);
    correctCircle = circlesRGBValues[getRandomNumber(circlesRGBValues.length)];
    document.getElementById("guess").innerHTML = "Colour: " + correctCircle;
    document.getElementById("result").innerHTML = "";
}

function vanishCircle(pickedCircleIndex) {
    circles[pickedCircleIndex].style.boxShadow = "none";
    circles[pickedCircleIndex].style.background = "none";
    document.getElementById("result").innerHTML = "WRONG";
}

function correctCircleColouring(run, pickedCircleIndex) {
    if (pickedCircleIndex == run) return;
    circlesRGBValues[run] = circlesRGBValues[pickedCircleIndex];
    circles[run].style.background = circlesRGBValues[pickedCircleIndex];
    circles[run].style.boxShadow = "5px 5px 105px 5px #ff8c00";
}

function pickCircle(pickedCircleIndex) {
    if (correctCircle != circlesRGBValues[pickedCircleIndex])
        return vanishCircle(pickedCircleIndex);
    for (let run = 0; run < colours.length; run -= -1)
        correctCircleColouring(run, pickedCircleIndex);
    document.getElementById("result").innerHTML = "CORRECT";
}

initialize();