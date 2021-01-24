var colonne, ligne, current, ship, bird, ecart, topp;
var grid = [];
var stack = [];
var ch = [];
var solv = [];
var flowers = [];
var drops = [];
var pipes = [];
var ktop, kbot, kright, kleft, fini, forme = false;
var accord = false;
var rencontre = false;
var rencontre2 = false;
var testu1 = false;
var testu2 = false;
var testu3 = false;
var oui = true;
var chargement = 0;
var v = 0;
var m = 0;
var jeux = 1;
var sc = 1;
var t = 50;
var s = 0;
s3 = 0;
s4 = 0;
var score = 0;
var remp = 0;
var nb = 1;
var u1 = 0;
var u2 = 0;
var u3 = 0;
var u11 = 21;
var u22 = 11;
var u33 = 1;
var L1 = 0;
var L2 = 0;
var L3 = 0;
var L4 = 0;
var K1 = 0;
var K2 = 0;
var K3 = 0;
var K4 = 0;
var c = 0;
var v = 0;

function setup() {
  this.complete = false;
  //frameRate(5);                           
  createCanvas(500,500);                   
  colonne = floor(width/t);
  ligne = floor(height/t);
  fin = (colonne*ligne)-1;
  
  bird = new Bird();
  pipes.push(new Pipe());
  
  for(var y = 0; y < ligne; y++){
    for(var x = 0; x < colonne; x++){
     var cellule = new Cellule(x,y);
     grid.push(cellule);                       
    }
  }
  current = grid[0];
  ship = new Ship();
  for (var j = 0; j < 5; j++){ 
  v = v + 0.1;
  if(sc === 1){  
  for (var i = 0; i < width/50; i++) {
    var flo = new Flower((width*0,20)+i*50, height*v);
    flowers.push(flo);
    sc = 2;
  }}else {if(sc === 2){  
  for (var i = 0; i < width/50; i++) {
    var flo = new Flower((width*0,50)+i*50, height*v);
    flowers.push(flo);
    sc = 1;
  }}}
}
}

function draw() {
background(51);

if(jeux === 1){
  fill(125, 100);
  stroke(255);
  sp();
  textIntro();
  if (s == 201){
    susp();
  }   
  if(forme === true){
  ship.show();
  if(ship.x <= width){
    if(ship.x >=0){
      ship.move();
    }else{ship.x = ship.x+1;}   
  }else{ship.x = ship.x-1;} 
  
  for (var i = 0; i < drops.length; i++) {
    drops[i].show();
    drops[i].move();
  }
  }
} 

if(jeux === 2){  
if(chargement === 0){
  loading();
}  
  
if(chargement === 1){  
  for(var i = 0; i < grid.length; i++){
    grid[i].show();                             
  }
}  
  if(this.complete === true){
    var prochaine = current.move();
    current.solved = true;
  if(chargement === 1){  
    current.shape();
    current.startEnd();
  }
    
    if(prochaine){
      prochaine.solved = true;
      solv.push(current);
      //trace(current, prochaine);
      //trace(prochaine, current);
      current = prochaine;
      keyPressed();
      setzero();
      if(current == grid[fin]){
        this.complete = false;
        chargement = 2;
      }
    }
  }
  
  if(this.complete === false){
  var suivante = current.checkVoisins();    
  current.visite = true;
  if(chargement === true){ 
   current.startEnd();
  }

  
  if(suivante){                                 
    suivante.visite = true;
    ch.push(current);
    stack.push(current);                        
    retireMur(current, suivante);
    current = suivante;
  }else if(stack.length > 0){
   current = stack.pop();
  }else if(current == grid[0]){
   this.complete = true;
   }
  }
  
if(chargement === 2){
    clear();
    chargement = 0;
    nb = 1;
    jeux = 3;
  }
 }
 
if(jeux === 3){
  
if(chargement === 0){
  sp();
  loading2();
if(rencontre){
    textIntro2();
    if (s == 201){
      susp();
    } 
}
}  
  
if(chargement === 1){
  sp();
  loading2();
}  
  
if(chargement === 2){  
 ship.show();
  if(ship.x <= width){
    if(ship.x >=0){
      ship.move();
    }else{ship.x = ship.x+1;}   
  }else{ship.x = ship.x-1;} 


  for (var i = 0; i < drops.length; i++) {
    drops[i].show();
    drops[i].move();
    for (var j = 0; j < flowers.length; j++) {
      if (drops[i].hits(flowers[j])) {
        flowers[j].evaporate();
        drops[i].evaporate();
      }
    }
  }

  var edge = false;
  stroke(255);
  rect(0, height*0.91, width*2, 0);

  for (var i = 0; i < flowers.length; i++) {
    flowers[i].show();
    flowers[i].move();
    if (flowers[i].x > width || flowers[i].x < 0) {
      edge = true;
    }
  }

  if (edge) {
    for (var i = 0; i < flowers.length; i++) {
      flowers[i].shiftDown();
    }
  }

  for (var i = drops.length-1; i >= 0; i--) {
    if (drops[i].toDelete) {
      drops.splice(i, 1);
    }
  }
  
  for (var i = flowers.length-1; i >= 0; i--) {
    if (flowers[i].y > height*0.9){
     // pour detecter perdu
    }
    if (flowers[i].toDelete) {
      flowers.splice(i, 1);
    }  
  }  
  if(flowers.length === 0){
    jeux = 4;
    chargement = 0;
    m = 0;
    nb = 1;
    rencontre = false;
  }  
}
}

if(jeux === 4){
  
if(chargement === 0){
  sp();
  loading3();
if(rencontre){
    textIntro3();
    if (s == 201){
      susp();
    } 
}
  
} 

if(chargement === 1){
  sp();
  loading3();
}

if(chargement === 2){
  progress();
  if(score >= 2500){
    jeux = 5;
    chargement = 0;
    m = 0;
    nb = 1;
    rencontre = false;    
  }
    for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();


    if (pipes[i].hits(bird)) {
      score = 0;
    }else{score++;}
    


    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }


  }

  bird.update();
  bird.show();

  if (frameCount % 60 == 0) {
    pipes.push(new Pipe());
  }
}  
}

if(jeux === 5){

if(chargement === 0){
  sp();
  loading4();
if(rencontre){
    textIntro4();
    if (s == 201){
      susp();
    } 
}  
}

if(chargement === 1){
  sp();
  loading5();
  textIntro5();
    if (s == 201){
      susp();
    }  
}

if(chargement === 2){
  
}

if(chargement === 3){
  finn();
}
}

}

function index(x,y){                                      
  if(x < 0 || y < 0 || x > colonne-1 || y > ligne-1){      
    return -1;                                             
  }
  return x + y * colonne;                       
}                                               

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function setzero(){
  ktop = false;
  kright = false;
  kbot = false;
  kleft = false;
}

function keyPressed(){
 if(keyCode === UP_ARROW){
  ktop = true;
  }else if(keyCode === DOWN_ARROW){
  kbot = true;
  }

 if(keyCode === LEFT_ARROW){
  kleft = true;
 }else if(keyCode === RIGHT_ARROW){
  kright = true;
 }
 if(jeux === 3){
  if (key === ' ') {
    var drop = new Drop(ship.x, height);
    drops.push(drop);
  }
 }
 if(jeux === 1){
  if (key === ' ') {
    var drop = new Drop(ship.x, height/2);
    drops.push(drop);
  }
 } 
if(jeux === 3 || jeux === 1){ 
  if (keyCode === RIGHT_ARROW) {
    ship.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    ship.setDir(-1);
  }
} 
if(jeux === 4){
  if (key == ' ') {
   bird.up();
   //console.log("SPACE");
  }
}

}

function keyReleased() {
if(jeux === 3 || jeux === 1){  
  if (key != ' ') {
    ship.setDir(0);
  }
}  
}

function loading(){
  var i = width*0.15;
  var j = height*0.45;
  var s = ch.length;
  var s2 = map(s, 0, (ligne*colonne)-1, 0, width*0.7)
  stroke(255);
  noFill();
   rect(i, j, width*0.7, height*0.1);
  fill(0, 255, 255, 100); 
   rect(i, j, s2, height*0.1);
  
  fill(125, 100);
  stroke(255);
  sp();
  
  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(35);
  textStyle(BOLD);
  text("Etape 1", 0, height*0.1, width, height*0.2);
  textSize(18);
  textStyle(NORMAL);
  textAlign(LEFT);  
  text("Aide Hetmanc à sortir du labyrinthe à l'aide des flèches du clavier.", width*0.01, height*0.805, width*0.99, height*0.195);  
  
  if(s2 == width*0.7){
    accord = true;
    susp();
  } 


}

function loading2(){
if(chargement === 0){  
  this.x = m;

if(rencontre === false){
  m = m+1;
  if(m >= width/3){
    rencontre = true;
  }
}

  fill(0, 255, 255, 100);
  radius = t/2; 
  beginShape();
  stroke(255);
  fill(0, 255, 255, 100)
  for (var a = 0; a < TWO_PI; a += 0.10) {
    var offset = map(sin(a*35 + frameCount * 0.1), -1, 1, -7, 7);
    var x = this.x - 25;
    var y = height/2;
    var r = radius + offset;
    var i = r * cos(a)+ x + t/2;
    var j = r * sin(a)+ y + t/2;
    vertex(i, j);
  }
  endShape();
}  
if(chargement === 1){
  var i = width*0.15;
  var j = height*0.45;
if(s3 < width*0.7){
  s3 = s3 + 2;
}
  stroke(255);
  noFill();
   rect(i, j, width*0.7, height*0.1);
  fill(0, 255, 255, 100); 
   rect(i, j, s3, height*0.1);
  
  fill(125, 100);
  stroke(255);
  sp();
  
  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(35);
  textStyle(BOLD);
  text("Etape 2", 0, height*0.1, width, height*0.2);
  textSize(18);
  textStyle(NORMAL);
  textAlign(LEFT);  
  text("Aide Hetmanc à éliminer tout les Glenit.", width*0.01, height*0.805, width*0.99, height*0.195);  
  
  if(s3 == width*0.7){
    accord = true;
    susp();
  } 
}  
 
}

function loading3(){
if(chargement === 0){  
  this.x = m;

if(rencontre === false){
  m = m+1;
  if(m >= width/3){
    rencontre = true;
  }
}

  fill(0, 255, 255, 100);
  radius = t/2; 
  beginShape();
  stroke(255);
  fill(0, 255, 255, 100)
  for (var a = 0; a < TWO_PI; a += 0.10) {
    var offset = map(sin(a*35 + frameCount * 0.1), -1, 1, -7, 7);
    var x = this.x - 25;
    var y = height/2;
    var r = radius + offset;
    var i = r * cos(a)+ x + t/2;
    var j = r * sin(a)+ y + t/2;
    vertex(i, j);
  }
  endShape();
}  
if(chargement === 1){
  var i = width*0.15;
  var j = height*0.45;
if(s4 < width*0.7){
  s4 = s4 + 2;
}
  stroke(255);
  noFill();
   rect(i, j, width*0.7, height*0.1);
  fill(0, 255, 255, 100); 
   rect(i, j, s4, height*0.1);
  
  fill(125, 100);
  stroke(255);
  sp();
  
  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(35);
  textStyle(BOLD);
  text("Etape 3", 0, height*0.1, width, height*0.2);
  textSize(18);
  textStyle(NORMAL);
  textAlign(LEFT);  
  text("Aide Hetmanc à s'enfuir", width*0.01, height*0.805, width*0.99, height*0.195);  
  
  if(s4 == width*0.7){
    accord = true;
    susp();
  } 
}  
 
}

function loading4(){
if(chargement === 0){  
  this.x = m;

if(rencontre === false){
  m = m+1;
  if(m >= width/3){
    rencontre = true;
  }
}

  fill(0, 255, 255, 100);
  radius = t/2; 
  beginShape();
  stroke(255);
  fill(0, 255, 255, 100)
  for (var a = 0; a < TWO_PI; a += 0.10) {
    var offset = map(sin(a*35 + frameCount * 0.1), -1, 1, -7, 7);
    var x = this.x - 25;
    var y = height/2;
    var r = radius + offset;
    var i = r * cos(a)+ x + t/2;
    var j = r * sin(a)+ y + t/2;
    vertex(i, j);
  }
  endShape();
}  
}  
 
function loading5(){
if(oui === true){  
  this.x = width/3;

  fill(0, 255, 255, 100);
  beginShape();
  stroke(255);
  fill(0, 255, 255, 100)
  for (var a = 0; a < TWO_PI; a += 0.10) {
    var offset = map(sin(a*35 + frameCount * 0.1), -1, 1, -7, 7);
    var x = this.x - 25  + random(-2, 2) + c;
    var y = height/2 + random(-2, 2) + v;
    var r = t/2 + offset;
    var i = r * cos(a)+ x + t/2;
    var j = r * sin(a)+ y + t/2;
    vertex(i, j);
  }
  endShape();
}  
if(rencontre2 === true){
  noStroke();
  fill(255, 255, 255, 100);
  ellipse(width-(width/L1), height*(0.5-K1), 30, 30); //haut
  ellipse(width-(width/L2), height*(0.4+K2), 30, 30); //droite
  ellipse(width-(width/L3), height*(0.5+K3), 30, 30); //bas
  ellipse(width-(width/L4), height*(0.4+K4), 30, 30); //gauche
  
  if(L1 <= 1.5){
    L1 = L1 + 0.1;
  }  
  if(K1 <= 0.05){
    K1 = K1 + 0.01;
  }
  
  if(L2 <= 1.78){
    L2 = L2 + 0.1;
  }  
  if(K2 <= 0.14){
    K2 = K2 + 0.01;
  }
  
  if(L3 <= 1.5){
    L3 = L3 + 0.1;
  }  
  if(K3 <= 0.15){
    K3 = K3 + 0.01;
  }

  if(L4 <= 1.25){
    L4 = L4 + 0.1;
  }  
  if(K4 <= 0.14){
    K4 = K4 + 0.01;
  } 
  
}  
}

function Cellule(x, y) {
  this.x = x;
  this.y = y;
  this.mur = [true, true, true, true];
  this.trace = [false, false, false, false];
  this.visite = false;
  
  this.move = function(){
    var next = [];
    var dessus = grid[index(x    , y - 1)];     
    var droite = grid[index(x + 1, y    )];    
    var bas    = grid[index(x    , y + 1)];   
    var gauche = grid[index(x - 1, y    )];     
    
    
   if(dessus && dessus.mur[2] === false && ktop === true){
    next.push(dessus);
    ktop = false;
   }  
   if(droite && droite.mur[3] === false && kright === true){
    next.push(droite);
    kright = false;
   }  
   if(bas && bas.mur[0] === false && kbot === true){
    next.push(bas);
    kbot = false;
    }  
   if(gauche && gauche.mur[1] === false && kleft === true){
    next.push(gauche);
    kleft = false;
   }
   
   if(next.length > 0){
    var r = floor(random(0, next.length));        
    return next[r];
   }else{
    return undefined;                                
   }
  }
  
  this.checkVoisins = function(){               
    var voisins = [];
    var dessus = grid[index(x    , y - 1)];      
    var droite = grid[index(x + 1, y    )];      
    var bas    = grid[index(x    , y + 1)];     
    var gauche = grid[index(x - 1, y    )];     
    
    if(dessus && !dessus.visite){
      voisins.push(dessus);                       
    }
     if(droite && !droite.visite){
      voisins.push(droite);                          
    }
     if(bas && !bas.visite){
      voisins.push(bas);                            
    }
     if(gauche && !gauche.visite){
      voisins.push(gauche);                          
    }
    
    if(voisins.length > 0){
      var r = floor(random(0, voisins.length));         
      return voisins[r];
    }else{
      return undefined;                                
    }
  }
  
  
  this.startEnd = function(){
   noStroke();
    fill(240, 195, 0, 100);
    rect(0, 0, t, t);
    rect(width - t, height - t, width, height);
  }
  
  
  this.shape = function(){
  radius = t/2;

  beginShape();
  stroke(255);
  fill(0, 255, 255, 100)
  for (var a = 0; a < TWO_PI; a += 0.10) {
    var offset = map(sin(a*35 + frameCount * 0.1), -1, 1, -7, 7);
    var x = this.x*t;
    var y = this.y*t;
    var r = radius + offset;
    var i = r * cos(a)+ x + t/2;
    var j = r * sin(a)+ y + t/2;
    vertex(i, j);
  }
  endShape();
    
  }
  
  this.show = function() {                     
    var x = this.x*t;
    var y = this.y*t;
    stroke(255);
    
    if(this.mur[0]){
     line(x     ,y     ,x + t ,y    );}                
    
    if(this.mur[1]){ 
     line(x + t ,y     ,x + t ,y + t);}                
    
    if(this.mur[2]){
     line(x + t ,y + t ,x     ,y + t);}                
    
    if(this.mur[3]){
     line(x     ,y + t ,x     ,y    );}  
     
    stroke(255, 0, 255);
    if(this.trace[0]){
      line(x + t/2, y, x + t/2, y + t/2);
    }
    if(this.trace[1]){
      line(x + t/2, y + t/2, x + t, y + t/2);
    }
    if(this.trace[2]){
      line(x + t/2, y + t/2, x + t/2, y + t);
    }
    if(this.trace[3]){
      line(x, y + t/2, x + t/2, y + t/2);
    }     
    
    // if (this.solved){
    //  noStroke();
    //  fill(102, 102, 102, 100);  
    //  rect(x, y, t, t);
    //}
  }
}

function retireMur(a, b){
 var x = a.x - b.x;         
  if(x === 1){
    a.mur[3] = false;        
    b.mur[1] = false;
  }else if(x === -1){
    a.mur[1] = false;
    b.mur[3] = false;
  }
 var y = a.y - b.y;         
  if(y === 1){
   a.mur[0] = false;        
   b.mur[2] = false;
  }else if(y === -1){
   a.mur[2] = false;
   b.mur[0] = false;
  }
}

function trace(a, b){
  var x = a.x - b.x;         
  if(x === 1){
    a.trace[3] = true;
  }else if(x === -1){
    a.trace[1] = true;
  }
  
   var y = a.y - b.y;         
   if(y === 1){
     a.trace[0] = true;
  }else if(y === -1){
     a.trace[2] = true;
  }
}

function unTrace(a, b){
  var x = a.x - b.x;        
  if(x === 1){
    a.trace[3] = false;
  }else if(x === -1){
    a.trace[1] = false;
  }
  
   var y = a.y - b.y;        
   if(y === 1){
     a.trace[0] = false;
  }else if(y === -1){
     a.trace[2] = false;
  }
}

function textIntro(){
  if(s < 200){
    s = s+3;
  }
  textAlign(LEFT);
  textSize(18);
  fill(255, s);
  noStroke();
  if(nb === 1){
    text("[inconnu] Bonjour ?",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
  if(nb === 2){
    text("[inconnu] Quelqu'un est là ?",width*0.01, height*0.805, width*0.99, height*0.195)
  }
  if(nb === 3){
    text("[inconnu] Ah, vous voilà.",width*0.01, height*0.805, width*0.99, height*0.195)
  }  
  if(nb === 4){
    text("[inconnu] Cela fait maintenant quelques jours que l'on m'a laissé ici, loin de ma maison..",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
  if(nb === 5){
    text("[inconnu] Peux tu m'aider à rentrer chez moi, à Gomineras ?",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
  if(nb === 6){
    text("[inconnu] Ah oui, je me prénomme Hetmanc.",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
  if(nb === 7){
    text("[Hetmanc] Me voici.",width*0.01, height*0.805, width*0.99, height*0.195)
    forme = true;
  } 
  if(nb === 8){
    text("[Hetmanc] Aussi, pour m'aider tu vas pouvoir diriger mon corps et utiliser mes capacités.",width*0.01, height*0.805, width*0.99, height*0.195)
  }
  if(nb === 9){
    text("[Hetmanc] Quelles capacités ?",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
  if(nb === 10){
    text("[Hetmanc] Sauter avec la barre espace, me déplacer avec les flèches de ton clavier.",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
  if(nb === 11){
    text("[Hetmanc] Ah oui encore une chose, si tu croises ces horribles Glenit, tu peux appuyer sur la barre espace pour les éliminer.",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
  if(nb === 12){
    text("[Hetmanc] Bien sûr tu ne sais pas qu'est ce qu'un Glenit..",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
  if(nb === 13){
    text("[Hetmanc] En gros ce sont des petites boules rouges, très méchantes, surtout sois sans pitié avec elles.",width*0.01, height*0.805, width*0.99, height*0.195)
  }  
  if(nb === 14){
    text("[Hetmanc] On est parti ?",width*0.01, height*0.805, width*0.99, height*0.195)
  }
  if(nb === 15){
    forme = false;
    jeux = 2;
    nb = 0;
  }  
}

function textIntro2(){
  if(s < 200){
    s = s+3;
  }
  textAlign(LEFT);
  textSize(18);
  fill(255, s);
  noStroke();
  if(nb === 1){
    text("[Hetmanc] Ouf, je n'en voyais pas la fin..",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
  if(nb === 2){
    text("[Hetmanc] Ne te réjouis pas trop vite, c'est loin d'être fini.",width*0.01, height*0.805, width*0.99, height*0.195)
  }
  if(nb === 3){
    text("[Hetmanc] La route est encore longue jusqu'à Gomineras.",width*0.01, height*0.805, width*0.99, height*0.195)
  }  
  if(nb === 4){
    text("[Hetmanc] Fait attention, j'ai souvent croisé des Glenits dans cette région.",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
  if(nb === 5){
    text("[Hetmanc] N'oublie pas, la barre espace pour leur tirer dessus, et les flèches pour me déplacer.",width*0.01, height*0.805, width*0.99, height*0.195)
  }
  if(nb === 6){
    text("[Hetmanc] On continue ?",width*0.01, height*0.805, width*0.99, height*0.195)
  }  
  if(nb === 7){
    chargement = 1;
  }  
}

function textIntro3(){
  if(s < 200){
    s = s+3;
  }
  textAlign(LEFT);
  textSize(18);
  fill(255, s);
  noStroke();
  if(nb === 1){
    text("[Hetmanc] Bien joué, tu les as tous eus !",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
  if(nb === 2){
    text("[Hetmanc] Te rappelles-tu, je t'avais dit que je pouvais sauter avec la barre espace.",width*0.01, height*0.805, width*0.99, height*0.195)
  }
  if(nb === 3){
    text("[Hetmanc] De quoi ?",width*0.01, height*0.805, width*0.99, height*0.195)
  }  
  if(nb === 4){
    text("[Hetmanc] Le rapport avec la conversation ?",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
  if(nb === 5){
    text("[Hetmanc] Aucun.",width*0.01, height*0.805, width*0.99, height*0.195)
  }
  if(nb === 6){
    text("[Hetmanc] Mais cela pourrait bien te servir plus tard.",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
  if(nb === 7){
    text("[Hetmanc] Oh non !",width*0.01, height*0.805, width*0.99, height*0.195)
  }   
  if(nb === 8){
    text("[Hetmanc] Des renforts arrivent !",width*0.01, height*0.805, width*0.99, height*0.195)
  }  
  if(nb === 9){
    text("[Hetmanc] Ils sont trop nombreux, cours !",width*0.01, height*0.805, width*0.99, height*0.195)
  }  
  if(nb === 10){
    text("[Hetmanc] Enfin appuie !",width*0.01, height*0.805, width*0.99, height*0.195)
  }  
  if(nb === 11){
    chargement = 1;
  }  
}

function textIntro4(){
  if(s < 200){
    s = s+3;
  }
  textAlign(LEFT);
  textSize(18);
  fill(255, s);
  noStroke();
  if(nb === 1){
    text("[Inconu] Arrête toi !",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
  if(nb === 2){
    text("[Hetmanc] Merde !",width*0.01, height*0.805, width*0.99, height*0.195)
  }
  if(nb === 3){
    text("[Hetmanc] On est encerclé..",width*0.01, height*0.805, width*0.99, height*0.195)
  }  
  if(nb === 4){
    text("[Inconu] Allez-y les gars on le tient !",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
  if(nb === 5){
    chargement = 1;
    nb = 0;
  }  
}

function textIntro5(){
  if(s < 200){
    s = s+3;
  }
  textAlign(LEFT);
  textSize(18);
  fill(255, s);
  noStroke();
  if(nb === 1){
    text("[Hetmanc] Non s'il vous plait, laissez moi partir.",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
  if(nb === 2){
    text("[Glenit] Pas de pitié !",width*0.01, height*0.805, width*0.99, height*0.195)
  }
  if(nb === 3){
    text("[Hetmanc] Aide moi, je t'en prie..",width*0.01, height*0.805, width*0.99, height*0.195)
  }  
  if(nb === 4){
    rencontre2 = true;
  } 
  if(nb === 5){
    text("[Glenit] Adieu saleté.",width*0.01, height*0.805, width*0.99, height*0.195)
    if(t > 0){
      t = t-1;
      c = c+width*0.001
      v = v+height*0.001
    }else{oui = false}
  }  
  if(nb === 6){
    text("[Glenit] Ouf, on l'a échappé belle.",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
  if(nb === 7){
    text("[Glenit] Il ne t'a pas fait de mal ?",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
  if(nb === 8){
    text("[Glenit] Pourquoi as-tu peur de nous ?",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
  if(nb === 9){
    text("[Glenit] Hein, nous des méchants ?",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
  if(nb === 10){
    text("[Glenit] Mais enfin, c'est grâce à nous si tu es encore en vie.",width*0.01, height*0.805, width*0.99, height*0.195)
  }
    if(nb === 11){
    text("(Tu lui racontes tout ce que t'a dit Hetmanc)",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
    if(nb === 12){
    text("[Glenit] (rire))",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
    if(nb === 13){
    text("[Glenit] Dis donc, ils sont de plus en plus intelligents ces virus.",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
    if(nb === 14){
    text("[Glenit] Mon pauvre tu t'es fait berner comme un jeune enfant innocent.",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
    if(nb === 15){
    text("[Glenit] N'as-tu point vu que Hetmanc était un anagramme de méchant ?",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
    if(nb === 16){
    text("[Glenit] Et Glenit un anagramme de gentil ?",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
  if(nb === 17){
    text("[Glenit] Et pour couronner le tout, encore un autre anagramme, Gomineras veut dire organisme.",width*0.01, height*0.805, width*0.99, height*0.195)
    chargement = 3;
  }     
  if(nb === 18){
    text("[Glenit] Qui sommes-nous ?",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
  if(nb === 19){
    text("[Glenit] Nous sommes des globules blancs, nous sommes chargés d'empêcher ce genre de virus de rentrer dans ton corps.",width*0.01, height*0.805, width*0.99, height*0.195)
  } 
  if(nb === 20){
    text("[Globule Blanc] Sois plus attentif la prochaine fois...",width*0.01, height*0.805, width*0.99, height*0.195)
    chargement = 3;
  }   
}

function mouseClicked(){
  if(s === 201){
    nb = nb + 1;
    s = 0;
  }
if(jeux === 2){
    if(accord === true){
    chargement = 1;
    accord = false;
  }
}
if(jeux === 3){
  if(accord === true){
    chargement = 2;
    accord = false;
  }
}
if(jeux === 4){
  if(accord === true){
    chargement = 2;
    accord = false;
  }
}
}

function sp(){
  fill(125, 100);
  stroke(255);  
  rect(width*0.005, height*0.80, width*0.99, height*0.195);
}

function Drop(x, y) {
  this.x = x;
  this.y = y;
  this.r = 8;
  this.toDelete = false;

  this.show = function() {
    noStroke();
    fill(255, 100);
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }

  this.evaporate = function() {
    this.toDelete = true;
  }

  this.hits = function(flower) {
    var d = dist(this.x, this.y, flower.x, flower.y);
    if (d < this.r + flower.r) {
      return true;
    } else {
      return false;
    }
  }

  this.move = function() {
    this.y = this.y - 10;
  }

}

function Flower(x, y) {
  this.x = x;
  this.y = y;
  this.r = 15;
  this.toDelete = false;
  this.xdir = 1;

  this.evaporate = function() {
    this.toDelete = true;
  }

  this.shiftDown = function() {
    this.xdir *= -1;
    this.y += this.r/4;
  }

  this.move = function() {
    this.x = this.x + this.xdir;
  }

  this.show = function() {
    noStroke();
    fill(255, 255, 255, 100);
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }

}

function Ship() {
  this.x = width/2;
  this.xdir = 0;

  this.show = function() {
    fill(0, 255, 255, 100);
   // rectMode(CENTER);
   //  rect(this.x, height-15, 30, 30);
  radius = t/2; 
  beginShape();
  stroke(255);
  fill(0, 255, 255, 100)
  for (var a = 0; a < TWO_PI; a += 0.10) {
    var offset = map(sin(a*35 + frameCount * 0.1), -1, 1, -7, 7);
    var x = this.x - 25;
    if(jeux === 3){
      var y = height-50;
    }
    if(jeux === 1){
      var y = height/2;
    }
    var r = radius + offset;
    var i = r * cos(a)+ x + t/2;
    var j = r * sin(a)+ y + t/2;
    vertex(i, j);
  }
  endShape();
  }

  this.setDir = function(dir) {
      this.xdir = dir;
  }

  this.move = function(dir) {
      this.x += this.xdir*5;
  }

}

function Pipe() {
  ecart = random(height*0.2, height*0.6)
  topp = random(height*0.1, height - (height*0.1+ecart));
  this.top = topp;
  this.bottom = height - (ecart + topp);
  this.x = width;
  this.w = 20;
  this.speed = 5;

  this.highlight = false;

  this.hits = function(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  this.show = function() {
    fill(255);
    if (this.highlight) {
      fill(255, 0, 0);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height-this.bottom, this.w, this.bottom);
  }

  this.update = function() {
    this.x -= this.speed;
  }

  this.offscreen = function() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }


}

function Bird() {
  this.y = height/2;
  this.x = 64;

  this.gravity = 0.6;
  this.lift = -15;
  this.velocity = 0;

  this.show = function() {
    fill(255);
  radius = t/2; 
  beginShape();
  stroke(255);
  fill(0, 255, 255, 100)
  for (var a = 0; a < TWO_PI; a += 0.10) {
    var offset = map(sin(a*35 + frameCount * 0.1), -1, 1, -7, 7);
    var x = this.x;
    var y = this.y;
    var r = radius + offset;
    var i = r * cos(a)+ x + t/2;
    var j = r * sin(a)+ y + t/2;
    vertex(i, j);
  }
  endShape();
  }

  this.up = function() {
    this.velocity += this.lift;
  }

  this.update = function() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

  }

}

function susp(){
  noStroke();
  fill(255);
  ellipse(width*0.94, height*0.985 + u1, 8, 8) 
  ellipse(width*0.958, height*0.985 + u2, 8, 8) 
  ellipse(width*0.975, height*0.985 + u3, 8, 8) 
  
if (testu1 === false){
  u1 = u1 - 0.1;
  u11 = u11 + 1;
  if (u11 == 25){
    testu1 = true;
  }
}
if (testu1 === true){
  u1 = u1 + 0.1;
  u11 = u11 - 1;
  if (u11 == 0){
    testu1 = false;
  }  
}
  
if (testu2 === false){
  u2 = u2 - 0.1;
  u22 = u22 + 1;
  if (u22 == 25){
    testu2 = true;
  }
}
if (testu2 === true){
  u2 = u2 + 0.1;
  u22 = u22 - 1;
  if (u22 == 0){
    testu2 = false;
  }  
}

if (testu3 === false){
  u3 = u3 - 0.1;
  u33 = u33 + 1;
  if (u33 == 25){
    testu3 = true;
  }
}
if (testu3 === true){
  u3 = u3 + 0.1;
  u33 = u33 - 1;
  if (u33 == 0){
    testu3 = false;
  }  
}  
  
}

function shape(){
  this.x = width/2;
  this.xdir = 0;

  this.show = function() {
    fill(0, 255, 255, 100);
   // rectMode(CENTER);
   //  rect(this.x, height-15, 30, 30);
  radius = t/2; 
  beginShape();
  stroke(255);
  fill(0, 255, 255, 100)
  for (var a = 0; a < TWO_PI; a += 0.10) {
    var offset = map(sin(a*35 + frameCount * 0.1), -1, 1, -7, 7);
    var x = this.x - 25;
    var y = height-50;
    var r = radius + offset;
    var i = r * cos(a)+ x + t/2;
    var j = r * sin(a)+ y + t/2;
    vertex(i, j);
  }
  endShape();
  }

  this.setDir = function(dir) {
      this.xdir = dir;
  }

  this.move = function(dir) {
      this.x += this.xdir*5;
  }

  
}

function progress(){
  
  remp = map(score, 0, 2500, 0, width*0.6)
  
  noFill();
  stroke(255);
  rect(width*0.2, height*0.1, width*0.6, height*0.05)
  
  fill(0,255,255,100);
  rect(width*0.2, height*0.1, remp, height*0.05)
}

function finn(){
  textAlign(CENTER);
  fill(255);
  noStroke();
  textSize(50);
  text("THE END", 0, 0, width, height)
}


