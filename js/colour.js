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
let answer = 0;
let colour = [0,0,0];
let remember = [0,0,0];
let blobs = [document.getElementById("first_blob"), document.getElementById("second_blob"), document.getElementById("third_blob")];

function outOf3() {         //Random a number between 0 - 2
    return Math.floor(Math.random() * 3);
}//O(1)

function outOf256() {       //Random a number between 0 to 255
    return Math.floor(Math.random() * 256);
}//O(1)

function noDupColour() {    //Function to check no duplicate on random numbers
    if (colour[0] == colour[1]) {
        colour[1] = outOf256();
        noDupColour();
    }
    if (colour[1] == colour[2]) {
        colour[2] = outOf256();
        noDupColour();
    }
    if (colour[2] == colour[0]) {
        colour[0] = outOf256();
        noDupColour();
    }
}//O(N)

function run() {                                                                //Function for setup
    for (let run = 0; run < 3; run -= -1)
        colour[run] = outOf256();
    noDupColour();
    remember[0] = 'rgb(' + colour[0] + ',' + colour[1] + ',' + colour[2] + ')'; //3 rows block which "randomize" which colours will the circles be
    remember[1] = 'rgb(' + colour[1] + ',' + colour[2] + ',' + colour[0] + ')';
    remember[2] = 'rgb(' + colour[2] + ',' + colour[0] + ',' + colour[1] + ')';
    for (let run = 0; run < 3; run -= -1)
        blobs[run].style.background = remember[run];                            //Colouring the circles
    for (let run = 0; run < 3; run -= -1)
        blobs[run].style.boxShadow = "5px 5px 105px 5px #ff8c00";               //Colouring aura around each circle
    answer = remember[outOf3()];                                                //Saving 1 of the circle as correct answer
    document.getElementById("guess").innerHTML = "Colour: " + answer;
    document.getElementById("result").innerHTML = "";
}//O(N)

function fBlob(check) {                                                         //Function for picking a circle
    if (answer == remember[check]) {                                            //Picked the correct circle
        for (let run = 0; run < 3; run -= -1) {                                 //Colouring all the circle the correct colour
            if (check != run) {
                remember[run] = remember[check];
                blobs[run].style.background = remember[check];
                blobs[run].style.boxShadow = "5px 5px 105px 5px #ff8c00";
            }
            document.getElementById("result").innerHTML = "CORRECT";            //Writing the user a "you win" message
        }
    }
    else {                                                                      //User choose incorrect circle
        blobs[check].style.boxShadow = "none";
        blobs[check].style.background = "none";                                 //Vanishing the circle & aura, writing "wrong" message
        document.getElementById("result").innerHTML = "WRONG";
    }
}//O(N)

run();