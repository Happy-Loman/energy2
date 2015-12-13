 //Star's//
var stars = [];
//Push 10 stars into the array
for(var i = 0; i < 5000; i++){
    stars.push({
      single:true,
      x:randNum(-map_w, map_w),
      y:randNum(-map_h, map_h),
      r:randNum(0.1, 3),
      energy:0,
      vx:0,
      vy:0,
      pos:i,
      color:"white",
    });
}

function draw_stars(object1){
      ctx.save();
      ctx.translate((offset.directionX), (offset.directionY));
      // clear the viewport
      //ctx.clearRect(-offset.directionX, -offset.directionY, cw,ch);
      if(cell.checkCollision(object1)){
        object1.x = randNum(-map_w, map_w);
        object1.y = randNum(-map_h, map_h);
      }

      ctx.beginPath();
      ctx.arc(object1.x, object1.y, object1.r, 0, (2 * Math.PI));
      ctx.fillStyle = object1.color;
      ctx.fill();
    
      ctx.restore();
}

function update_stars(){
  for (var i = 0; i < stars.length; i++) {
      var star = stars[i];
      var dis = return_distance(camera.x, camera.y, star.x, star.y);
      if(dis < 1800){
        draw_stars(star);
      }
    };
}

/*function updateToolTipDisplay(){
  if(true){
    
  } else {
    mouse.display = "15";
  }
}*/

//Save for version 2//
/*function format(number){
    var newNum = "";
    if(number >= 1000){
        var x = 0;
        numberding = number.toString();
        for(var i = numberding.length - 1; i >= 0; i--){
           newNum += numberding[x];
           if((i % 3) === 0 && i >= 1){
               newNum += ",";
           }
           x++;
        }
        return newNum;
    } else {
        return number.toString();
    }
    
}*/

function generalUpdate() {
  GID("parts").innerHTML = parts.amount.toFixed(2) + "<div style=\"font-size:18px;\">parts<div>";
  GID("energy").innerHTML = cell.energy.toFixed(2) + "<div style=\"font-size:18px;\">energy<div>";
  if(mouse.toolTip){
    GID("mouse").style.display = "inline";
  } else {
    GID("mouse").style.display = "none";
  }

  if(parts.amount <= 0){
    parts.amount = 0;
  }
}

var FPS = 50;
window.setInterval(function(){
  if(loaded){
    ctx.clearRect(0,0,map_w, map_h); 
    camera_setter.update();
    cell.draw();
        //cell.update();
    bot_draw();
    bot_update();

    update_stars();
    update_resources();
    update_engines();
    update_forms();
    update_machines();
    generalUpdate();
  }
  //updateToolTipDisplay();
}, 1000/FPS);

/*var loaded = false;
var newGame = true;
var saveName = "will";
if(JSON.parse(localStorage.getItem(saveName)) == null){
    saving();
} else {
    load();
    loaded = true;
}

/*window.setInterval(function(){
  window.setTimeout(function(){
    var audio = new Audio('http://cd.textfiles.com/cdaction/cdaction27a/FIFTH/WAV/_WIND2.WAV');
    audio.play();
  }, 4000);

  window.setTimeout(function(){
    var audio_ = new Audio('http://www.starbasec3.com/ghostship/wind2.wav');
    audio_.play();
  }, 8000);
}, 1000 * 14);*/

/*function saveOgState() {
    var save = {
        resources:resources,
        engines:engines,
        forms:forms,
        machines:machines,
        energy:cell.energy,
        parts:parts,
        bots:bots,
    }
    localStorage.setItem(saveName, JSON.stringify("getOgState"));
}

function loadOgState() {
    saveObj = JSON.parse(localStorage.getItem("getOgState"));

    resources = saveObj.resources;
    engines = saveObj.engines;
    forms = saveObj.forms;
    machines = saveObj.machines;
    cell.energy = saveObj.energy;
    parts = saveObj.parts;
    bots = saveObj.bots;
    setObjectArray(saveObj);
}*/

/*function saving() {
    var save = {
        resources:resources,
        engines:engines,
        forms:forms,
        machines:machines,
        energy:cell.energy,
        parts:parts,
        bots:bots,
        curr_page:curr_page,
        resourceBot:resourceBot,
        generatorBot:generatorBot,
        formsBot:formsBot,
        //newGame:newGame,
    }
    localStorage.setItem(saveName, JSON.stringify(save));
}

function setObjectArray(object){
  resources_ = [object.resources.batteries, object.resources.wires, object.resources.lightbulbs];
  engines_ = [object.engines.generators, object.engines.chargers, object.engines.heaters];
  forms_ = [object.forms.solars, object.forms.thermal, object.forms.chemical, object.forms.electrical];
  machinesArr = [object.machines.camera, object.machines.automate, object.machines.botAI];
}

var saveObj;
function load() {
     saveObj = JSON.parse(localStorage.getItem(saveName));

    resources = saveObj.resources;
    engines = saveObj.engines;
    forms = saveObj.forms;
    machines = saveObj.machines;
    cell.energy = saveObj.energy;
    parts = saveObj.parts;
    bots = saveObj.bots;
    formsBot = saveObj.formsBot;
    resourceBot = saveObj.resourceBot;
    generatorBot = saveObj.generatorBot;
    //newGame = saveObj.newGame;
    setObjectArray(saveObj);
}

window.setInterval(function(){
    if(loaded){
      saving();
    }
}, 100);
*/
/*function start(){
  window.requestAnimFrame(start);
    ctx.clearRect(0,0,map_w, map_h);

    camera_setter.draw();
    camera_setter.update();

    cell.draw();
    cell.update();

    bot_draw();
    bot_update();
    
    update_packets();

    energytransport.draw();

    UI.update();
}

start();*/
