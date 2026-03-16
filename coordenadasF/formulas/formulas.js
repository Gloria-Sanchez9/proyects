function abrirPopup(){
    document.getElementById("popup").style.display = "flex";
}

function cerrarPopup(){
    document.getElementById("popup").style.display = "none";
}

let btn1 = document.getElementById("btn1");
let popup1 = document.getElementById("popup1");
let cerrar1 = document.getElementById("cerrar1");

btn1.addEventListener("click", function(){
    popup1.style.display = "block";
    document.body.classList.add("no-scroll");   //no se mueve el fondo
});

cerrar1.addEventListener("click", function(){
    popup1.style.display = "none";
    document.body.classList.remove("no-scroll"); //ya se mueve el fondo 
});

let btn2= document.getElementById("btn2");
let popup2 = document.getElementById("popup2");
let cerrar2 = document.getElementById("cerrar2");

btn2.addEventListener("click", function(){
    popup2.style.display = "block";
    document.body.classList.add("no-scroll");
});

cerrar2.addEventListener("click", function(){
    popup2.style.display = "none";
    document.body.classList.remove("no-scroll");
});

let btn3 = document.getElementById("btn3");
let popup3 = document.getElementById("popup3");
let cerrar3 = document.getElementById("cerrar3");

btn3.addEventListener("click", function(){
    popup3.style.display = "block";
    document.body.classList.add("no-scroll");   //no se mueve el fondo
});

cerrar3.addEventListener("click", function(){
    popup3.style.display = "none";
    document.body.classList.remove("no-scroll"); //ya se mueve el fondo 
});