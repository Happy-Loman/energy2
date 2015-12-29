var ship = {
	name: "X-Wing",
	energy: 1000,
	max_energy: 1000,
	mass:1000,
	consume_rate: 0,//Consumes this amount of energy every second//
	engine: {
		status: false,
		power: 0,
	},

	shell: {
		power:10,
		layers: 10,
	},

	weapon: {
		status: false,
		type: {
			ray: {
				name: "Ray Gun",
				power: 12, //12 damage// 
				speed: 10, //10 shot per second.//
				cooldown: 5, //5 second cool down per shot.//
			},

			/*plasma: {
				name:"Plasma"
			},

			machine: {
				name: "Machine"
			},

			missile: {
				name: "Missile"
			},

			particle: {
				name: "Particle Ray"
			},

			laser: {
				name: "Laser Show"
			},*/
		},
	},

	shield: {
		status: false,
		strength: 0,
	},

	life: {
		oxygen:{
			lvl: 2,
			water_reserve: 100,
		},
		food: 0,
		hydration: 0,
		gravity_pull: 0,
	},

	time: {
		day: 0,
		hour: 0,
		min: 0,
		sec: 0,
	},
}

var x = 255;
function add_oxygen(){
	oxygen_lvl = (ship.life.oxygen.water_reserve * 0.23)/2;
	var max_oxygen = (ship.mass * 0.22) + (ship.energy * 0.22) + (ship.life.food * 0.72);
	//console.log("o2: " + oxygen_lvl + " d: " + max_oxygen);
	if(oxygen_lvl >= max_oxygen){
		ship.life.oxygen.lvl = 100;
	} else {
		ship.life.oxygen.lvl = (oxygen_lvl/max_oxygen) * 100;
	}
}

function add_energy(){
	if((ship.energy <= ship.max_energy && cell.energy > (ship.max_energy - ship.energy)) || ship.energy >= ship.max_energy){
		cell.energy -= (ship.max_energy - ship.energy);
        ship.energy += (ship.max_energy - ship.energy);
        //console.log(ship.energy);
    } else {
    	var takeAmount = cell.energy/2;
        ship.energy += takeAmount;
    	cell.energy -= takeAmount;
    }
}

function upgrade_shipcapacity(object){
	if(object.avalable && cell.energy >= object.increase_cost){
        ship.max_energy += object.increase_cost;
        object.increase_cost += (object.increase_cost * 0.2);
        cell.energy -= object.increase_cost;
    } else if(!object.avalable){
        mouse.display = "Not yet unlocked.";
    } else if(cell.energy < object.increase_cost){
        mouse.display = "Increase Capacity." + " Costs " + object.increase_cost.toFixed(2) + "e";
    }
}

var meal = 0;
function update_ship(){
	ship.consume_rate = (bots.length) + (ship.mass * 0.001)
	ship.mass = ((parts.amount * 0.76) + 1000).toFixed(2); //Mass of ship grows over time depending on the number of parts//

	//The shield power is determed by how large the ship is along with the amount of energy we need to power the shield//
	if(ship.energy <= ((ship.shell.layers * ship.shell.power) + (ship.mass * ship.consume_rate))){
		ship.shield.strength = (ship.energy/ ((ship.mass * ship.consume_rate))) * 100;
	} else {
		ship.shield.strength = 100;
	}
	if(ship.shield.strength < 10){
		ship.shield.status = false;
	} else {
		ship.shield.status = true;
	}

	if(resources.animals.amount > 0){
		resources.animals.progress.clicked = true;
    	ship.life.food += resources.animals.produce_rate;
   		resources.animals.amount -= 1;
	}

   	if(resources.water.amount > 0){
   		resources.water.progress.clicked = true;
    	ship.life.oxygen.water_reserve += resources.water.produce_rate;;
    	resources.water.amount -= resources.water.produce_rate;
   	}

	//console.log(meal);
	meal++;//Tne time for the next meal//
	if(meal	% 1000 == 0 && ship.life.food > 5.6){
		ship.life.food -= 5.3;
		ship.life.oxygen.water_reserve -= 10;
	}

	//Gravitational pull of the ship
	ship.life.gravity_pull = ((ship.mass/10000)/10000).toFixed(6);
	add_oxygen();
	//console.log("What do u mean: " + (ship.shell.layers * ship.shell.power) + (ship.mass * 10));
	if(autoClick == true){
      add_energy();
    }

    if(ship.energy <= ship.max_energy/2 && !(ship.energy < ship.consume_rate)){
    	$("#body").css("opacity", ((ship.energy/ship.max_energy) + 0.5).toFixed(2));
    	console.log(ship.energy/ship.max_energy);
    } else if(ship.energy < ship.consume_rate){
    	$("#body").css("opacity", "0.2");
    }else {
		$("#body").css("opacity", "1");
	}
	if(ship.energy < ship.consume_rate){
		ship.energy = 0;
		mouse.display = "Seems like you're ship is low on energy";
		$("#energy_bar").css("width", ((ship.energy/ship.max_energy) * 190) + "px");
		GID("energy_bar").innerHTML = ship.energy.toFixed(2) + "e/" + ship.max_energy.toFixed(2) + "e";
		if(ship.energy <= 10){
			GID("ship_energy").style.backgroundColor = "rgb(238,60,48)";
		} else {
			GID("ship_energy").style.backgroundColor = "rgb(230,230,60)";
		}
		//$("#body").css("opacity", "0.3");
	}
}

window.setInterval(function(){
	ship.time.sec++;
	if(ship.time.sec >= 60){
		ship.time.sec = 0;
		ship.time.min++;
	}

	if(ship.time.min >= 60){
		ship.time.min = 0;
		ship.time.hour++;
	}

	if(ship.time.hour >= 24){
		ship.time.hour = 0;
		ship.time.day++;
	}
}, 1000/10);

function update_ship_UI(){
	if(ship.energy > 0){
		$("#energy_bar").css("width", ((ship.energy/ship.max_energy) * 190) + "px");
		GID("ship_name").innerHTML = ship.name;
		GID("energy_bar").innerHTML = ship.energy.toFixed(2) + "e/" + ship.max_energy.toFixed(2) + "e";
		GID("time").innerHTML = "[Day:" + ship.time.day + "] [" + ship.time.hour + ":" + ship.time.min + ":" + ship.time.sec + "]";
		GID("ship_mass").innerHTML = "Ship mass: " + ship.mass + "kg";
		GID("ship_energy_rate").innerHTML = "Consumption: " + ship.consume_rate.toFixed(2) + "e/sec";

		GID("ship_engine").innerHTML = "Engine power: " + ship.engine.power.toFixed(2);
		GID("ship_shield").innerHTML = "Protection: " + ship.shield.strength.toFixed(1) + "%";
		if(ship.energy <= ship.consume_rate){
			GID("ship_energy").style.backgroundColor = "rgb(238,60,48)";
		} else {
			GID("ship_energy").style.backgroundColor = "rgb(230,230,60)";
		}

		if(ship.engine.status){
			GID("ship_engine").style.backgroundColor = "rgb(230,230,60)";
		} else {
			GID("ship_engine").style.backgroundColor = "rgb(238,60,48)";
		}

		if(ship.shield.status){
			GID("ship_shield").style.backgroundColor = "rgb(230,230,60)";
		} else {
			GID("ship_shield").style.backgroundColor = "rgb(238,60,48)";
		}

		if(ship.life.oxygen.lvl < 10){
			GID("ship_oxygen_lvl").style.backgroundColor = "rgb(238,60,48)";
		} else {
			GID("ship_oxygen_lvl").style.backgroundColor = "rgb(230,230,60)";
		}

		if(ship.life.food < 10){
			GID("ship_food").style.backgroundColor = "rgb(238,60,48)";
		} else {
			GID("ship_food").style.backgroundColor = "rgb(230,230,60)";
		}
		GID("ship_oxygen_lvl").innerHTML = "O2 Level: " + ship.life.oxygen.lvl.toFixed(0) + "%";
		GID("ship_food").innerHTML = "Food Amount: " + ship.life.food.toFixed(2) + "lb";
		GID("ship_gravity").innerHTML = "Gravity: " + ship.life.gravity_pull + " m/s<span style=\"font-size:9px;\">2</span>";
	}
}

window.setInterval(function(){
	if(ship.energy > ship.consume_rate){
		ship.energy -= ship.consume_rate;
	}
}, 1000);

/*if(ship.weapon.status){
		GID("ship_weapon").innerHTML = ship.weapon.type.ray.name;
		GID("ship_weapon").style.backgroundColor = "rgb(60,187,60)";
	} else {
		GID("ship_weapon").innerHTML = ship.weapon.type.ray.name;
		GID("ship_weapon").style.backgroundColor = "rgb(238,60,48)";
	}

	GID("ship_shell").innerHTML = "Shell layers: " + ship.shell.layers;
	GID("ship_hydration").innerHTML = "Liquid Volume: " + ship.life.hydration.toFixed(2);
*/
