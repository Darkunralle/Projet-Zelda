// Création du plateau
var plateau = $('<div class = "plateau" style="background-color: #90EE90; height: 200px; width: 200px;position:absolute;"></div>');
// Création de la pastille link
var link = $('<div class ="link" style="color: blue; background-color: blue; height: 20px; width: 20px;position:absolute; border-radius: 50%;"></div>');
// Création du vase
var vase = $('<div class ="vase" style="color: brown; background-color: brown; height: 20px; width: 20px; position:absolute;"></div>');

// Initialisation variable de déplacement
var lx = 20;
var ly = 20;

$("body").append(plateau);
$(plateau).append(link);
$(plateau).append(vase);

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

// Placement initiale du vase
vase.css({
    "left": "100px",
    "top": "100px"
})


$("body").keypress(pressfunction);

// Tableau du niveau (mur et case vide)
var tab = 
[
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1]
];


// Fonction détection de collision
function collision(tab){
    var xt = lx;
    var yt = ly;
    if(tab[xt/20][yt/20] == 1){
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