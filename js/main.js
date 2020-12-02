// Création du plateau
var plateau = $('<div class = "plateau" style="background-color: #90EE90; height: 400px; width: 400px;position:absolute;"></div>');
// Création de la pastille link
var link = $('<div class ="link" style="color: blue; background-color: blue; height: 20px; width: 20px;position:absolute; border-radius: 50%;"></div>');

var indicateur = $('<div class = "indicateur" style="color: red; background-color: red; height: 5px; width: 5px;position: absolute;"></div>');

// Initialisation variable de déplacement
var lx = 20;
var ly = 20;

$("body").append(plateau);
$(plateau).append(link);
$(plateau).append(indicateur);

var wall;
var ennemie;
var door;
var direction = "bas";
var indix = 7.5;
var indiy = 15;
// Placement initiale de Link
link.css({
    "left": lx +"px",
    "top" : ly +"px"
})

indicateur.css({
    "left" : lx + 7.5 +"px",
    "top" : ly + 15 + "px"
})

// Placement initiale du plateau
plateau.css({
    "left": "250px",
    "top" : "100px"
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
    [1,0,0,3,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
    [1,0,0,3,0,0,0,0,2,0,0,0,1,0,0,0,0,0,0,1],
    [1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
    [1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
    [1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
    [1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,0,1],
    [1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
    [1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
    [1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];
actualisation(tab);
function actualisation(tab){
    for(c=0;c<tab.length;c++){
        for(l=0;l<tab[0].length;l++){
            if(tab[c][l]== 1){
                
                wall = $('<div class ="wall" style="background-color: grey; height: 20px; width: 20px; position:absolute;"></div>');
                wall.css({
                    "left" : l*20 + "px",
                    "top" : c*20 + "px"
                });
                $(plateau).append(wall);
            }
            if(tab[c][l]== 2){
                ennemie = $('<div class ="ennemie" style="background-color: red; height: 20px; width: 20px; position:absolute;"></div>');
                ennemie.css({
                    "left" : l*20 + "px",
                    "top" : c*20 + "px"
                });
                $(plateau).append(ennemie);
            }
            if(tab[c][l]== 3){
                door = $('<div class ="wall" style="background-color: brown; height: 20px; width: 20px; position:absolute;"></div>');
                door.css({
                    "left" : l*20 + "px",
                    "top" : c*20 + "px"
                });
                $(plateau).append(door);
            }
        }
    }
}
function destruction(tab,direction){
    if(direction == "bas"){

    }
    if(direction == "haut"){
        
    }
    if(direction == "droite"){
        if(tab[ly/20+1][lx/20] == 3){
            tab[ly/20+1][lx/20] = 0;
            console.log("DESTRUCTION");
            // Non fonctionnel -> Get le mur en question et le DEPLACER pour simuler un delete
            actualisation(tab);
        }
        if(tab[ly/20][lx/20+1] == 3){
            tab[ly/20][lx/20+1] = 0;
            console.log("DESTRUCTION");
            // Non fonctionnel -> Get le mur en question et le DEPLACER pour simuler un delete
            actualisation(tab);
        }
        if(tab[ly/20-1][lx/20] == 3){
            tab[ly/20-1][lx/20] = 0;
            console.log("DESTRUCTION");
            // Non fonctionnel -> Get le mur en question et le DEPLACER pour simuler un delete
            actualisation(tab);
        }
        if(tab[ly/20][lx/20-1] == 3){
            tab[ly/20][lx/20-1] = 0;
            console.log("DESTRUCTION");
            // Non fonctionnel -> Get le mur en question et le DEPLACER pour simuler un delete
            actualisation(tab);
        }
    }
    if(direction == "gauche"){
        
    }
}

// Fonction détection de collision
function collision(tab){
    var xt = lx;
    var yt = ly;
    if(tab[yt/20][xt/20] != 0){
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
        indix = 7.5;
        indiy = 0;
        direction = "haut";
        condition = collision(tab);
        if(condition){
            ly+=20;}}

    // Identifie le code ASCII de la touche s
    if(key==115){
        ly += 20;
        key=0;
        indix = 7.5;
        indiy = 15;
        direction = "bas";
        condition = collision(tab);
        if(condition){
            ly-=20;}}

    // Identifie le code ASCII de la touche d
    if(key==100){
        lx += 20;
        key=0;
        indix = 15;
        indiy = 7.5;
        direction = "droite";
        condition = collision(tab);
        if(condition){
            lx-=20;}}

    // Identifie le code ASCII de la touche q
    if(key==113){
        lx -= 20;
        key=0;
        indix = 0;
        indiy = 7.5;
        direction = "gauche";
        condition = collision(tab);
        if(condition){
            lx += 20;
        }}
    if(key == 32){
        key = 0;
        destruction(tab,direction);
    }

    // Rectifie le placement de la pastille link selon la touche
    link.css({
        "left": lx + "px",
        "top": ly + "px"
    });
    indicateur.css({
        "left" : lx + indix +"px",
        "top" : ly + indiy + "px"
    })

}

