let btnPapel = document.getElementById("btnPapel");
let popupPapel = document.getElementById("popupPapel");
let cerrarPapel = document.getElementById("cerrarPapel");

btnPapel.addEventListener("click", function(){
    popupPapel.style.display = "block";
    document.body.classList.add("no-scroll");   //no se mueve el fondo
});

cerrarPapel.addEventListener("click", function(){
    popupPapel.style.display = "none";
    document.body.classList.remove("no-scroll"); //ya se mueve el fondo 
});

let btnGeo = document.getElementById("btnGeo");
let popupGeo = document.getElementById("popupGeo");
let cerrarGeo = document.getElementById("cerrarGeo");

btnGeo.addEventListener("click", function(){
    popupGeo.style.display = "block";
    document.body.classList.add("no-scroll");
});

cerrarGeo.addEventListener("click", function(){
    popupGeo.style.display = "none";
    document.body.classList.remove("no-scroll");
});