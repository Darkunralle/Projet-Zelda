// Création du plateau
var plateau = $('<div class = "plateau" style="background-color: #90EE90; height: 400px; width: 400px;position:absolute;"></div>');
// Création de la pastille link
var link = $('<div class ="link" style="color: blue; background-color: blue; height: 20px; width: 20px;position:absolute; border-radius: 50%;"></div>');
// Création de mur
var wallt = $('<div class ="wallt" style="color: brown; background-color: brown; height: 20px; width: 400px; position:absolute;"></div>');
var walld = $('<div class ="walld" style="color: brown; background-color: brown; height: 20px; width: 400px; position:absolute;"></div>');
var walll = $('<div class ="walll" style="color: brown; background-color: brown; height: 400px; width: 20px; position:absolute;"></div>');
var wallr = $('<div class ="wallr" style="color: brown; background-color: brown; height: 400px; width: 20px; position:absolute;"></div>');
var wallit = $('<div class ="wallt" style="color: brown; background-color: brown; height: 20px; width: 200px; position:absolute;"></div>');
var wallid = $('<div class ="walld" style="color: brown; background-color: brown; height: 20px; width: 200px; position:absolute;"></div>');
var wallil = $('<div class ="walll" style="color: brown; background-color: brown; height: 80px; width: 20px; position:absolute;"></div>');
var wallil2 = $('<div class ="walll" style="color: brown; background-color: brown; height: 80px; width: 20px; position:absolute;"></div>');
var wallir = $('<div class ="wallr" style="color: brown; background-color: brown; height: 200px; width: 20px; position:absolute;"></div>');

// Initialisation variable de déplacement
var lx = 20;
var ly = 20;

$("body").append(plateau);
$(plateau).append(link);
$(plateau).append(wallt);
$(plateau).append(walld);
$(plateau).append(walll);
$(plateau).append(wallr);
$(plateau).append(wallit);
$(plateau).append(wallid);
$(plateau).append(wallil);
$(plateau).append(wallil2);
$(plateau).append(wallir);

// Placement initiale de Link
link.css({
    "left": lx +"px",
    "top" : ly +"px"
})

// Placement initiale du plateau
plateau.css({
    "left": "250px",
    "top" : "100px"
})

// Placement des murs
wallt.css({
    "left" : "0px",
    "top" : "0px"
})
walll.css({
    "left" : "0px",
    "top" : "0px"
})
wallr.css({
    "left" : "380px",
    "top" : "0px"
})
walld.css({
    "left" : "0px",
    "top" : "380px"
})
//
wallit.css({
    "left" : "60px",
    "top" : "60px"
})
wallil.css({
    "left" : "60px",
    "top" : "60px"
})
wallil2.css({
    "left" : "60px",
    "top" : "180px"
})
wallir.css({
    "left" : "240px",
    "top" : "60px"
})
wallid.css({
    "left" : "60px",
    "top" : "240px"
})

$("body").keypress(pressfunction);

// Tableau du niveau (mur et case vide)
var tab = 
[
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1],
    [1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
    [1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
    [1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
    [1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
    [1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
    [1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
    [1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];



// Fonction détection de collision
function collision(tab){
    var xt = lx;
    var yt = ly;
    if(tab[yt/20][xt/20] == 1){
        return true;
    }
    else{return false;}
}

function pressfunction(event){
    var condition = false;
    // /!\ Faire des animations /!\

    // Recupere le code de la touche
    var key = event.keyCode;

    // Identifie le code ASCII de la touche z
    if(key==122){
        ly -= 20;
        key=0;
        condition = collision(tab);
        if(condition == true){
            ly+=20;}}

    // Identifie le code ASCII de la touche s
    if(key==115){
        ly += 20;
        key=0;
        condition = collision(tab);
        if(condition == true){
            ly-=20;}}
    // Identifie le code ASCII de la touche d
    if(key==100){
        lx += 20;
        key=0;
        condition = collision(tab);
        if(condition == true){
            lx-=20;}}

    // Identifie le code ASCII de la touche q
    if(key==113){
        lx -= 20;
        key=0;
        condition = collision(tab);
        if(condition == true){
            lx += 20;
        }}

    // Rectifie le placement de la pastille link selon la touche
    link.css({
        "left": lx + "px",
        "top": ly + "px"
    });
}