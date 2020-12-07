// Création du plateau
var plateau = $('<div class = "plateau" style="height: 400px; width: 400px;position:absolute;"></div>');
// Création de la pastille link
var link = $('<div class ="link" style="color: blue; background-color: blue; height: 20px; width: 20px;position:absolute; border-radius: 50%;z-index: 10;"></div>');

var indicateur = $('<div class = "indicateur" style="color: red; background-color: red; height: 5px; width: 5px;position: absolute;z-index: 11;"></div>');

// Initialisation variable de déplacement
var lx = 20;
var ly = 20;
// Compteur de vie
var life = 3;

$("body").append(plateau);
$(plateau).append(link);
$(plateau).append(indicateur);

// Divers variables
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

// Apelle de la fontion a chaque action
$("body").keypress(pressfunction);

// Tableau du niveau (mur et case vide)
// 0 -> sol
// 1 -> mur
// 2 -> ennemie
// 3 -> porte
// 5 -> piège
var tab = 
[
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,1],
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
// S'occupe de gerer l'affichage
function actualisation(tab){
    for(c=0;c<tab.length;c++){
        for(l=0;l<tab[0].length;l++){
            // mur
            if(tab[c][l]== 1){
                
                wall = $('<div class ="wall" style="background-color: grey; height: 20px; width: 20px; position:absolute;"></div>');
                wall.css({
                    "left" : l*20 + "px",
                    "top" : c*20 + "px"
                });
                $(plateau).append(wall);
            }
            // ennemie
            if(tab[c][l]== 2){
                ennemie = $('<div class ="ennemie" style="background-color: red; height: 20px; width: 20px; position:absolute;"></div>');
                ennemie.css({
                    "left" : l*20 + "px",
                    "top" : c*20 + "px"
                });
                $(plateau).append(ennemie);
            }
            // Porte
            if(tab[c][l]== 3){
                door = $('<div class ="wall" style="background-color: brown; height: 20px; width: 20px; position:absolute;"></div>');
                door.css({
                    "left" : l*20 + "px",
                    "top" : c*20 + "px"
                });
                $(plateau).append(door);
            }
            // Sol
            if(tab[c][l]== 0){
                wall = $('<div class ="wall" style="background-color: #90EE90; height: 20px; width: 20px; position:absolute;"></div>');
                wall.css({
                    "left" : l*20 + "px",
                    "top" : c*20 + "px"
                });
                $(plateau).append(wall);}
            // Piège
            if(tab[c][l]== 5){
                trap = $('<div class ="trap" style="background-color: black; height: 20px; width: 20px; position:absolute;"></div>');
                trap.css({
                    "left" : l*20 + "px",
                    "top" : c*20 + "px"
                });
                $(plateau).append(trap);}
        }
    }
}
// Fonction qui gère la destruction de div
function destruction(tab,direction){
    if(direction == "bas"){
        // Si la div selectionner et une porte ou un ennemie alors la remplace par du sol
        if(tab[ly/20+1][lx/20] == 3 || tab[ly/20+1][lx/20] == 2){
            tab[ly/20+1][lx/20] = 0;
            actualisation(tab);
        }
    }
    if(direction == "haut"){
        if(tab[ly/20-1][lx/20] == 3 || tab[ly/20-1][lx/20] == 2){
            tab[ly/20-1][lx/20] = 0;
            actualisation(tab);
        }
    }
    if(direction == "droite"){

        if(tab[ly/20][lx/20+1] == 3 || tab[ly/20][lx/20+1] == 2){
            tab[ly/20][lx/20+1] = 0;
            actualisation(tab);
        }
    }
    if(direction == "gauche"){
        if(tab[ly/20][lx/20-1] == 3 || tab[ly/20][lx/20-1] == 2){
            tab[ly/20][lx/20-1] = 0;
            actualisation(tab);
        }
    }
}

// Fonction détection de collision
function collision(tab){
    var xt = lx;
    var yt = ly;
    // Si la div n'est pas du sol / un piège / un ennemie bloque le passage
    if(tab[yt/20][xt/20] != 0 && tab[yt/20][xt/20] != 5 && tab[yt/20][xt/20] != 2){
        return 1;
    // Si ces un piège subi des dégâts mais passe dessus
    }else if(tab[yt/20][xt/20] == 5 ){
        return 2;
    // Si ces un ennemies subi des dégat mais ne bouge pas
    }else if(tab[yt/20][xt/20] == 2 ){
        return 3;
    }
    // Sinon c good
    else{return 0;}
}

function pressfunction(event){
    var condition = 0;
    // /!\ Faire des animations /!\

    // Recupere le code de la touche
    var key = event.keyCode;

    // Identifie le code ASCII de la touche z
    if(key==122){
        ly -= 20;
        key=0;
        indix = 7.5;
        indiy = 0;
        // Direction du personnage
        direction = "haut";
        // Permet de choisir l'action
        condition = collision(tab);
        // Face a un mur
        if(condition == 1){
            ly+=20;}
        // Dans un piège
        else if(condition == 2){
            life -= 1;
            // Vérifie si le personnage est en vie
            verifLife(life);
            // Affiche les pv (uniquement console pour l'instant)
            console.log(life);
        }
        // Face a un ennemie
        else if(condition == 3){
            life -= 1;
            verifLife(life);
            console.log(life);
            ly+=20;
        }}

    // Identifie le code ASCII de la touche s
    if(key==115){
        ly += 20;
        key=0;
        indix = 7.5;
        indiy = 15;
        direction = "bas";
        condition = collision(tab);
        if(condition == 1){
            ly-=20;}
        else if(condition == 2){
            life -= 1;
            verifLife(life);
            console.log(life);
        }
        else if(condition == 3){
            life -= 1;
            verifLife(life);
            console.log(life);
            ly-=20;
        }}

    // Identifie le code ASCII de la touche d
    if(key==100){
        lx += 20;
        key=0;
        indix = 15;
        indiy = 7.5;
        direction = "droite";
        condition = collision(tab);
        if(condition == 1){
            lx-=20;}
        else if(condition == 2){
            life -= 1;
            verifLife(life);
            console.log(life);
        }
        else if(condition == 3){
            life -= 1;
            verifLife(life);
            console.log(life);
            lx-=20;
        }
    }

    // Identifie le code ASCII de la touche q
    if(key==113){
        lx -= 20;
        key=0;
        indix = 0;
        indiy = 7.5;
        direction = "gauche";
        condition = collision(tab);
        if(condition == 1){
            lx += 20;
        }
        else if(condition == 2){
            life -= 1;
            verifLife(life);
            console.log(life);
        }
        else if(condition == 3){
            life -= 1;
            verifLife(life);
            console.log(life);
            lx += 20;
        }}
    // Barre espace (attaque)
    if(key == 32){
        key = 0;
        // Vérifie et détruit l'objet si possible
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
// Fonction de vérification des hp
function verifLife(life){
    if(life <= 0){
        console.log("Game over");
        // Supprime les personnages
        $(".link").remove();
        $(".indicateur").remove();
        noMouvement(tab);
    }
}
// Fonction qui empêche tout mouvement par modification de la matrice
function noMouvement(tab){
    for(c=0;c<tab.length;c++){
        for(l=0;l<tab[0].length;l++){
            if (tab[c][l] == 0){
                tab[c][l] = 9;
            }}}
}
