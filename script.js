//Get the angle of object against object2
function return_angle(object_x, object_y, object2_x, object2_y){
    var dx = object_x - object2_x;
    var dy = object_y - object2_y;
    
    var angle = Math.atan2(dy, dx);
    return angle;
}

//Get the distance between object and object2
function return_distance(object_x, object_y, object2_x, object2_y){
    var dx = object_x - object2_x;
    var dy = object_y - object2_y;
    var d = Math.sqrt(dx * dx + dy * dy);

    return d;
}

//Make a random color
function randColor(){
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//Random number Generator
function randNum( min, max ) {
    return Math.random() * ( max - min ) + min;
}

function randVal(x, y){
  var rand = randNum(1, 3);
  if(rand < 2){
    return y;
  } else {
    return x;
  }
}

//Getting elements by ID for UI/UX
function GID(id){
  return document.getElementById(id);
}
var parts = {
  amount: 0,
}

var click_delay = 0;
var autoClick = false;
var convertAll = false;

var resources = {
  batteries: {
    resource: "Battery",
    types:{
      first: "resources",
      second: "energy",
    },
    amount:0,
    rarity:100,
    produce_rate:0.23,
    progress : {
      clicked: false,
      converting : false,
    },
    id:"batteries",
  },

  wires: {
    resource: "Wires",
    types:{
      first: "resources",
      second: "energy",
    },
    amount:0,
    rarity:80,
    produce_rate:0.554,
    progress : {
      clicked: false,
      converting : false,
    },
    id:"wires",
  },

  lightbulbs: {
    resource: "Lightbulbs",
    types:{
      first: "resources",
      second: "energy",
    },
    amount:0,
    rarity:75,
    produce_rate:1,
    progress : {
      clicked: false,
      converting : false,
    },
    id:"lightbulb",
  },

  water: {
    resource: "Water",
    types:{
      first: "resources",
      second: "life",
    },
    amount:10,
    rarity:16,
    produce_rate:10,
    progress : {
      clicked: false,
      converting : false,
    },
    id:"water",
  },

  animals: {
    resource: "Animals",
    //Add more type later//
    types:{
      first: "resources",
      second: "life",
    },
    amount:0,//pounds//
    rarity:10,
    produce_rate:0.04,
    progress : {
      clicked: false,
      converting : false,
    },
    id:"animals",
  },
}
var resources_ = [resources.batteries, resources.wires, resources.lightbulbs, resources.water, resources.animals];
function convert(object){
  if(object.types.second == "energy" && !convertAll){
    object.amount -= 1;
    parts.amount -= 0.5;
    cell.energy += object.produce_rate;
  } else if(convertAll){
    cell.energy += object.amount * object.produce_rate;
    parts.amount -= object.amount * 0.2;
    object.amount -= object.amount;
  }
}

function update_resources(){
  for(var i = 0; i < resources_.length; i++){
    var res = resources_[i];
    if(res.amount <= 0){
      res.amount = 0;
    }
    if(res.amount > 0 && res.progress.clicked){
      $("#" + res.id + "_bar").css("background-color", "rgb(100, 205, 100)");
      $("#" + res.id + "_bar").css("color", "rgb(246, 246, 246)");
      convert(res);
      res.progress.converting = true;
    }
    if(res.progress.clicked == false) {
      $("#" + res.id + "_bar").css("background-color", "rgb(205, 60, 60)");
      $("#" + res.id + "_bar").css("color", "rgb(246, 246, 246)");
    };

    if(res.amount <= 0) {
      res.progress.clicked = false;
      $("#" + res.id + "_bar").css("background-color", "transparent");
      $("#" + res.id + "_bar").css("color", "#222222");
    } else if(autoClick == true){
      res.progress.clicked = true;
    }

    if(res.type == "energy"){
      GID(res.id + "_bar").innerHTML = res.resource + ":"+ res.amount.toFixed(2);
    } else {
      GID(res.id + "_bar").innerHTML = res.resource + ":"+ res.amount.toFixed(2);
    }
  }
}

var engines = {
  generators: {
    resource: "Generator",
    amount:0,
    rarity:40,
    life_time:30,
    produce_rate:0.8,
    progress : {
      clicked: false,
      converting : false,
    },
    id:"generators",
  },

  chargers: {
    resource: "Charger",
    amount:0,
    rarity:35,
    life_time:20,
    produce_rate:1,
    progress : {
      clicked: false,
      converting : false,
    },
    id:"chargers",
  },

  heaters: {
    resource: "Heat",
    amount:0,
    rarity:20,
    life_time:10,
    produce_rate:1.5,
    progress : {
      clicked : false, 
      converting : false,
    },
    id:"heaters",
  },
}

//These generate energy and dont die instantly//
var engines_ = [engines.generators, engines.chargers, engines.heaters];
function convert_engine(object){
  if(convertAll){
    cell.energy += (object.amount * object.life_time) * object.produce_rate;
    parts.amount -= object.amount * 0.2;
    object.amount -= object.amount;
  } else if(object.life_time <= 0){
    object.amount -= 1;
    parts.amount -= 0.5;
    object.life_time = 10;
  } else {
    cell.energy += object.produce_rate;
    object.life_time -= 0.2;
  }
}
function update_engines(){
  for(var i = 0; i < engines_.length; i++){
    var eng = engines_[i];
    if(eng.amount <= 0){
      eng.amount = 0;
    }
    if(eng.amount > 0 && eng.progress.clicked){
      $("#" + eng.id + "_bar").css("background-color", "rgb(100, 205, 100)");
      $("#" + eng.id + "_bar").css("color", "rgb(240, 240, 240)");
      convert_engine(eng);
      eng.progress.converting = true;
      //console.log(eng.amount);
    }
    if(eng.progress.clicked == false) {
      $("#" + eng.id + "_bar").css("background-color", "rgb(205, 60, 60)");
      $("#" + eng.id + "_bar").css("color", "rgb(240, 240, 240)");
    }

    if(eng.amount <= 0) {
      eng.progress.clicked = false;
      $("#" + eng.id + "_bar").css("background-color", "transparent");
      $("#" + eng.id + "_bar").css("color", "#222222");
    } else if(autoClick == true){
      eng.progress.clicked = true;
    }
    GID(eng.id + "_bar").innerHTML = eng.resource + ":"+ eng.amount.toFixed(2);
  }
}


var forms = {
  solars: {
    resource: "Solar Energy",
    amount:0,
    rarity:6,
    produce_rate:0.1,
    progress : {
      clicked: false,
      converting : false,
    },
    id:"solars",
  },

  thermal: {
    resource: "Thermal Energy",
    amount:0,
    rarity:4,
    produce_rate:0.22,
    progress : {
      clicked: false,
      converting : false,
    },
    id:"thermal",
  },

  chemical: {
    resource: "Chemical Energy",
    amount:0,
    rarity:2,
    produce_rate:0.31,
    progress : {
      clicked: false,
      converting : false,
    },
    id:"chemical",
  },

  electrical: {
    resource: "Electrical Energy",
    amount:0,
    rarity:1,
    produce_rate:0.38,
    progress : {
      clicked: false,
      converting : false,
    },
    id:"electrical",
  },
}

//Forms of energy//
var forms_ = [forms.solars, forms.thermal, forms.chemical, forms.electrical];
function convert_form(object){
  cell.energy += object.amount * object.produce_rate;
}
function update_forms(){
  for(var i = 0; i < forms_.length; i++){
    var form = forms_[i];
    if(form.amount <= 0){
      form.amount = 0;
    }
    if(form.amount > 0 && form.progress.clicked){
      $("#" + form.id + "_bar").css("background-color", "rgb(100, 205, 100)");
      $("#" + form.id + "_bar").css("color", "rgb(240, 240, 240)");
      convert_form(form);
      form.progress.converting = true;
    } 
    if(form.progress.clicked == false) {
      $("#" + form.id + "_bar").css("background-color", "rgb(205, 60, 60)");
      $("#" + form.id + "_bar").css("color", "rgb(240, 240, 240)");
    };
    if(form.amount <= 0) {
      $("#" + form.id + "_bar").css("background-color", "transparent");
      $("#" + form.id + "_bar").css("color", "#222222");
    }
    GID(form.id + "_bar").innerHTML = form.resource + ":"+ form.amount.toFixed(2);
  }
}

var true_ = false;
var mouse = {
  display:"",
  toolTip:false,
  disableTooltip:false,
}

window.onmousemove = function(e){
    var d = GID('mouse');
    d.style.position = "absolute";
    e = e || window.event;
    var position = [e.clientX || e.pageX, e.clientY || e.pageY];
    
    var x = e.clientX;
    var y = e.clientY;
    d.style.left = (position[0] + 30) + "px";
    d.style.top = (position[1]) + "px";
    d.innerHTML = mouse.display;
   ////console.log("X: " + e.clientX + " Y: " + e.clientY);
};  

/*var FPS = 100;
var max_width = 300;
function progress(secs, progres, object){
  var time = object.secs*FPS;
    if(object.progress.progres >= time){
        object.progress.progres = 0;
        $("#" + object.id + "_bar").css("width", (((object.progress.progres/time) * max_width)) + "px");
        object.progress.clicked = false;
        object.progress.progressing = false;
        controlProgressBar(1000/FPS, object);
    } else {
        $("#" + object.id + "_bar").css("width", (((object.progress.progres/time) * max_width)) + "px");
        //object.progress.progressing = true;
        object.progress.progres += 1;
    }
}

var intervalID = null;
function controlProgressBar(frame, object) {
  if(object.progress.progressing){
    return 0;
  }
  if(object.progress.clicked){
    intervalID = setInterval(function(){
     progress(object);
    }, frame);
  } else{
    clearInterval(intervalID);
  }
}*/
