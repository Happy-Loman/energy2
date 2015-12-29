var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var cw = canvas.width;
var ch = canvas.height;
var map_w = cw * 4;var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var cw = canvas.width;
var ch = canvas.height;
var map_w = cw * 4;
var map_h = ch * 4;
var numOfPackets = 0;

//canvas.style.width = "1600px";
$(window).resize(function() {
  $("#canvas").height($("#canvas").width());
});

window.setInterval(function(){
  $(window).resize();
}, 100);

var zoom = {
  zoom:false,
  scale: 1,
};

var offset = {
  speedx: 9,
  speedy: 9,
  maxSpeed: 10,
  offSetting: false,
  directionX: 0,
  directionY: 0,

  gaugeSpeed: function(){
    if(offset.speedx > offset.maxSpeed){
      offset.speedx = this.maxSpeed;
    } else {
      offset.speedx += 0.1;
    }

    if(offset.speedy > offset.maxSpeed){
      offset.speedy = this.maxSpeed;
    } else {
      offset.speedy += 0.1;
    }
  },
};

//Here we will update the camera's position
var camera = {
    x: cw/2,
    y: ch/2,
    worldx:randNum(-map_w, map_w),
    worldy:randNum(-map_h, map_h), 
    vx:0,
    vy:0,    
    update: function(){
        this.x += this.vx;
        this.y += this.vy;
    }
};

//The camera_setter object.
var camera_setter = {
    x: camera.x,
    y: camera.y,
    left:false,
    right:false,
    up:false,
    down:false,
    update: function(){
      this.x += this.vx; 
      this.y += this.vy;

      if(this.left){
        offset.directionX -= offset.speedx;
          camera.x += offset.speedx;
          camera.worldx -= 1;
          camera_setter.energy -= camera_setter.energy_output;
      }
      if(this.up){
        offset.directionY -= offset.speedy;
          camera.y += offset.speedy;
          camera.worldy += 1;
          camera_setter.energy -= camera_setter.energy_output;
      }
      if(this.right){
        offset.directionX += offset.speedx; 
          camera.x -= offset.speedx;
          camera.worldx -= 1;
          camera_setter.energy -= camera_setter.energy_output;
      }
      if(this.down){
        offset.directionY += offset.speedy;
          camera.y -= offset.speedy; 
          camera.worldy -= 1;
          camera_setter.energy -= camera_setter.energy_output;
      }
  },
};

var keyPressed = [];
window.onkeydown = function(e){
  e = e || window.event;
  keyPressed[e.keyCode] = true;
  if(keyPressed[37] || keyPressed[65]){
    offset.offSetting = true;
    camera_setter.right = true;
  }

  if(keyPressed[38] || keyPressed[87]){
    offset.offSetting = true;
    camera_setter.down = true;
  }

  if(keyPressed[39] || keyPressed[68]){
    offset.offSetting = true;
    camera_setter.left = true;
  }

  if(keyPressed[40]|| keyPressed[83]){
    offset.offSetting = true;
    camera_setter.up = true;
  }

  /*if(keyPressed[70]){
    console.log(zoom.scale);
    zoom.scale = 10;
  }

  if(keyPressed[71]){
    console.log(zoom.scale);
    zoom.scale = -10;
  }*/
};

window.onkeyup = function(e){
  e = e || window.event;
  var code = e.which || e.keyCode;
  keyPressed[e.keyCode] = false;
  if(code === 37 || code === 65){ 
    offset.offSetting = false;
    camera_setter.right = false;
    camera.vx = 0;
    offset.directionX -= 0;
  }
        
  if(code === 38 || code === 87){
    offset.offSetting = false;
    camera_setter.down = false; 
    camera.vy = 0;
    offset.directionY -= 0;
  }
     
  if(code === 39 || code === 68){ 
    offset.offSetting = false;
    camera_setter.left = false;
    camera.vx = 0;
    offset.directionX += 0; 
  } 
        
  if(code === 40 || code === 83){
    offset.offSetting = false;
    camera_setter.up = false;
    camera.vy = 0;
    offset.directionY += 0;
  }
};
var map_h = ch * 4;
var numOfPackets = 0;

//canvas.style.width = "1600px";
$(window).resize(function() {
  $("#canvas").height($("#canvas").width());
});

window.setInterval(function(){
  $(window).resize();
}, 100);

var zoom = {
  zoom:false,
  scale: 1,
};

var offset = {
  speedx: 9,
  speedy: 9,
  maxSpeed: 10,
  offSetting: false,
  directionX: 0,
  directionY: 0,

  gaugeSpeed: function(){
    if(offset.speedx > offset.maxSpeed){
      offset.speedx = this.maxSpeed;
    } else {
      offset.speedx += 0.1;
    }

    if(offset.speedy > offset.maxSpeed){
      offset.speedy = this.maxSpeed;
    } else {
      offset.speedy += 0.1;
    }
  },
};

//Here we will update the camera's position
var camera = {
    x: cw/2,
    y: ch/2,
    worldx:randNum(-map_w, map_w),
    worldy:randNum(-map_h, map_h), 
    vx:0,
    vy:0,    
    update: function(){
        this.x += this.vx;
        this.y += this.vy;
    }
};

//The camera_setter object.
var camera_setter = {
    x: camera.x,
    y: camera.y,
    left:false,
    right:false,
    up:false,
    down:false,
    update: function(){
      this.x += this.vx; 
      this.y += this.vy;

      if(this.left){
        offset.directionX -= offset.speedx;
          camera.x += offset.speedx;
          camera.worldx -= 1;
          camera_setter.energy -= camera_setter.energy_output;
      }
      if(this.up){
        offset.directionY -= offset.speedy;
          camera.y += offset.speedy;
          camera.worldy += 1;
          camera_setter.energy -= camera_setter.energy_output;
      }
      if(this.right){
        offset.directionX += offset.speedx; 
          camera.x -= offset.speedx;
          camera.worldx -= 1;
          camera_setter.energy -= camera_setter.energy_output;
      }
      if(this.down){
        offset.directionY += offset.speedy;
          camera.y -= offset.speedy; 
          camera.worldy -= 1;
          camera_setter.energy -= camera_setter.energy_output;
      }
  },
};

var keyPressed = [];
window.onkeydown = function(e){
  e = e || window.event;
  keyPressed[e.keyCode] = true;
  e.preventDefault();
  if(keyPressed[37] || keyPressed[65]){
    offset.offSetting = true;
    camera_setter.right = true;
  }

  if(keyPressed[38] || keyPressed[87]){
    offset.offSetting = true;
    camera_setter.down = true;
  }

  if(keyPressed[39] || keyPressed[68]){
    offset.offSetting = true;
    camera_setter.left = true;
  }

  if(keyPressed[40]|| keyPressed[83]){
    offset.offSetting = true;
    camera_setter.up = true;
  }

  /*if(keyPressed[70]){
    console.log(zoom.scale);
    zoom.scale = 10;
  }

  if(keyPressed[71]){
    console.log(zoom.scale);
    zoom.scale = -10;
  }*/
};

window.onkeyup = function(e){
  e = e || window.event;
  var code = e.which || e.keyCode;
  keyPressed[e.keyCode] = false;
  e.preventDefault();
  if(code === 37 || code === 65){ 
    offset.offSetting = false;
    camera_setter.right = false;
    camera.vx = 0;
    offset.directionX -= 0;
  }
        
  if(code === 38 || code === 87){
    offset.offSetting = false;
    camera_setter.down = false; 
    camera.vy = 0;
    offset.directionY -= 0;
  }
     
  if(code === 39 || code === 68){ 
    offset.offSetting = false;
    camera_setter.left = false;
    camera.vx = 0;
    offset.directionX += 0; 
  } 
        
  if(code === 40 || code === 83){
    offset.offSetting = false;
    camera_setter.up = false;
    camera.vy = 0;
    offset.directionY += 0;
  }
};
