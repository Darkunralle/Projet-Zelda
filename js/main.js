var plateau = $('<div class = "plateau" style="background-color: #90EE90; height: 800px; width: 800px;position:absolute;"></div>');
// Création de la pastille link
var link = $('<div class ="link" style="color: blue; background-color: blue; height: 20px; width: 20px;position:absolute; border-radius: 50%;"></div>');
// Création du vase
var vase = $('<div class ="vase" style="color: brown; background-color: brown; height: 20px; width: 20px; position:absolute;"></div>');


//var direction = $('<div class = "direction" style="color: red; background-color: red; height: 30px; width: 5px;position: absolute;top:-15px;left: 12.5px;"></div>');
//Emplacement de base
var lx = 30;
var ly = 30;

$("body").append(plateau);
$(plateau).append(link);
$(plateau).append(vase);
//$(Link).append(direction);

link.css({
    "left": "30px",
    "top" : "30px"
})

plateau.css({
    "left": "250px",
    "top" : "100px"
})

vase.css({
    "left": "310px",
    "top": "310px",
})


$("body").keypress(pressfunction);

function pressfunction(event){

    // /!\ Faire des animations /!\

    // Recupere le code de la touche
    var key = event.keyCode;

    // Identifie le code ASCII de la touche z
    if(key==122){
        if(ly >= 60){
            ly -= 20;
            key=0;}}

    // Identifie le code ASCII de la touche s
    if(key==115){
        if(ly <= 740){
            ly += 20;
            key=0;}}
    // Identifie le code ASCII de la touche d
    if(key==100){
        if(lx <= 740){
            lx += 20;
            key=0;}}

    // Identifie le code ASCII de la touche q
    if(key==113){
        if(lx >= 60){
            lx -= 20;
            key=0;}}

    // Rectifie le placement de la pastille link selon la touche
    link.css({
        "left": lx + "px",
        "top": ly + "px",
    });
}