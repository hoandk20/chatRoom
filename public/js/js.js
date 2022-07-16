/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

let coin =100;


function onload1() {
    let name = document.cookie;
    document.getElementById("name").innerHTML = "Name: "+name;
}
function help() {
    var r = document.getElementById("help");
    if (r.style.display == 'block') {
        r.style.display = 'none';
    } else {
        r.style.display = 'block';
    }
}
function checkWin(a, b, c) {
    win = 0;
    if (a == b && b == c) {
        return 2;
    }
    if (a == b || b == c || a == c) {
        return 1;
    }
    return 0;
}

function load() {

    var n1=Math.floor(Math.random() * 10);
    var n2=Math.floor(Math.random() * 10);
    var n3=Math.floor(Math.random() * 10);


    var mess = checkWin(n1,n2,n3);
    if(checkWin(n1,n2,n3)==0){
        coin-=2;
    }
    if(checkWin(n1,n2,n3)==1){
        coin+=8;
    }
    if(checkWin(n1,n2,n3)==2){
        coin+=200;
    }
    fruits = ["apple.png", "avocado.png", "cherry.png", "lemon.png", "megalon.png",
        "peach.png", "Banana.png", "coconut.png", "strawberry.png", "pineapple.png"];
    var data =
         "<div class=\"ajax\">"
        + "<div class=\"cash\"><lable class=\"number\" id=\"num\" style=\"\">"+coin+"</lable><img class=\"coinx\" src=\"img/coinx.png\"alt=\"\"/></div>"
        + "                    <img class=\"img1\" src=\"img/" + fruits[n1] + "\" alt=\"\"/>\n"
        + "                    <img class=\"img2\" src=\"img/" + fruits[n2] + "\" alt=\"\"/>\n"
        + "                    <img class=\"img3\" src=\"img/" + fruits[n3] + "\" alt=\"\"/>\n";
        if (mess==1) {
            data+="<lable class=\"message\" id=\"mes\">You win and get 8<img class=\"coinx\" src=\"img/coinx.png\"alt=\"\"/></lable>";
            reportScore("just win the game coin now is: ");
        }
        if (mess==2) {
            data+="<lable class=\"message\" id=\"mes\">You win a big prize with 200<img class=\"coinx\" src=\"img/coinx.png\"alt=\"\"/></lable>";
            reportScore("just win big price coin now is: ");
        }
        if (mess==0) {
            data+="<lable class=\"message\" id=\"mes\">You Lose!</lable>";

        }


    var r = document.getElementById("ajax");
    r.innerHTML = data;

}
function reset() {
    var conf = confirm("Do you want to reset your coin?");
    if (conf == false) {
        return;
    }
    document.getElementById("reset").submit();
}
var running = false;
function play() {
    if (running == true) {
        return;
    }
    running = true;
    var img = document.getElementById("machine");
    img.src = "img/Play.png";
    var spin1 = document.getElementById("spin1");
    var spin2 = document.getElementById("spin2");
    var spin3 = document.getElementById("spin3");
    var s = document.getElementById("num").innerHTML;
    if (s < 2) {
        alert("You are out!");
        return;
    }
    s = s - 2;
    document.getElementById("mes").innerHTML = "";
    spin1.style.display = 'block';
    spin2.style.display = 'block';
    spin3.style.display = 'block';
    setTimeout(stop, 2500);
    setTimeout(load, 2000);
    setTimeout(load1, 3000);

}
function load_btnReset() {
    var img = document.getElementById("btn-re");
    img.src = img.src = "img/re.png";
    load1();
}
function load1() {
    running = false;
    var img = document.getElementById("machine");
    img.src = "img/Normal.png";
}
function stop() {
    spin1.style.display = 'none';
    spin2.style.display = 'none';
    spin3.style.display = 'none';

}
function restart() {
    var r = document.getElementById("frm-re");
    var img = document.getElementById("btn-re");
    img.src = img.src = "img/re-press.png";
    r.submit();
}
function isAlphaOrParen(str) {
    return /^[a-zA-Z0-9() ]+$/.test(str);
}
function checkLogin() {
    var inputName = document.getElementById("name-inputLogin");
    if (inputName.value.trim().length == 0) {
        var name = document.getElementById("invalid-nameLogin");
        name.innerHTML = "Name Can not be blank!";
        name.style.display = 'block';
        return;
    }
    if (inputName.value.trim().length > 20 || inputName.value.length < 3) {
        var name = document.getElementById("invalid-nameLogin");
        name.innerHTML = "Name Too long or short!";
        name.style.display = 'block';
        return;
    }

    if (isAlphaOrParen(inputName.value)) {
    } else {
        var name = document.getElementById("invalid-nameLogin");
        name.innerHTML = "Invalid Name!";
        name.style.display = 'block';
        return;
    }

    var play = document.getElementById("login");
    play.submit();

   

}
//socket
function reportScore(msg){
        socket = io();
        const name = document.cookie;
        const message =msg+coin;
        socket.emit('on-chat', {
            name, message
        })
       
}


