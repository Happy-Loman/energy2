var machines = {
	ship_capacity: {
		type:"capacity",
		avalable:false,
		cost: {
			energy:1030,
			parts:670,
			met:false,
		},
		id:"more_storage",
		exta_tip: "",
		increase_cost:1000,
		display: "",
	},

	camera: {
		type:"camera",
		avalable:false,
		cost: {
			energy:20000,
			parts:1025,
			met:false,
		},
		id:"viewport",
		display: "",
	},

	automate: {
		type: "automate",
		avalable: false,
		cost: {
			energy:3000,
			parts:130,
			met:false,
		},
		id:"automation",
		display: "",
	},

	convert_all: {
		type: "convert_all_",
		avalable: false,
		cost: {
			energy:1040,
			parts:700,
			met:false,
		},
		id:"convert_all",
		display: "",
	},

	botAI: {
		type: "botAI",
		avalable: false,
		cost: {
			energy:1230,
			parts:130,
			met:false,
		},
		id:"betterAI",
		display: "<div>Next upgrade</div>" + 1230 + " Energy " + 130 + " parts</div>",
	},
}

var machinesArr = [machines.ship_capacity, machines.camera, machines.automate, machines.convert_all, machines.botAI];
function update_machines(){
	for(var i = 0; i < machinesArr.length; i++){
		var mach = machinesArr[i];
		if(mach.avalable){
			//console.log(mach.type + " " + mach.avalable);
			$("#" + mach.id).fadeOut("slow");
			if(mach.type == "automate"){
				//$("#" + mach.id).fadeOut("slow");
				$("#automation_toggle").removeClass("not_displayed");
			}

			if(mach.type == "camera"){
				$("#canvas_nav").removeClass("not_displayed");
			}

			if(mach.type == "capacity"){
				mach.exta_tip = " Costs " + mach.increase_cost.toFixed(2) + "e";
			}

			if(mach.type == "convert_all_"){
				$("#convert_all_toggle").removeClass("not_displayed");
			}
		}
		if(mach.cost.met){
			if(start_timer){
				$("#betterAI_").css("width", ((current_time/end_time) * 200) + "px");
				GID("betterAI_").innerHTML = ((current_time/end_time) * 100).toFixed(0) + "%";

				if(current_time >= end_time){
					start_timer = false;
					GID("betterAI_").innerHTML = "Upgrade ready";
				}
			}
		}
	}
}

function checkMachinesCostMet(object){
	if(cell.energy >= object.cost.energy && parts.amount >= object.cost.parts){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;

		object.cost.met = true;
	} else {
		object.cost.met = false;
	}
}

var start_timer = false;
var end_time = 1000;
function addMachines(object){
	checkMachinesCostMet(object);
	if(!object.cost.met){
		mouse.display = "<div>You cant access this yet you need " + object.cost.energy.toFixed(2) + " energy and " + object.cost.parts.toFixed(2) + " parts </div>";
		return 0;
	}

	if(object.cost.met == true && object.type != "botAI"){
		object.avalable = true;
	}

	if(object.type == "automate"){
		mouse.display = "Check your options";
	}

	if(object.type == "botAI"){
		for(var i = 0; i < bots.length; i++){
			var b = bots[i];
			if(current_time >= (end_time)){
				if(!(b.smartness <= 20)){
					b.finds_for_next_lvl = b.finds_for_next_lvl/2;
					object.cost.energy += (object.cost.energy * 0.08);
					object.cost.parts += (object.cost.parts * 0.08);
				}
				object.display = "<div>Next upgrade</div>" + object.cost.energy.toFixed(2) + " Energy " + object.cost.parts.toFixed(2) + " parts</div>";
			} else {
				object.display = "<div>Next upgrade</div> <div>Wait " + ((end_time - current_time)/60).toFixed(2) + " minutes(In game)</div> " + object.cost.energy.toFixed(2) + " Energy " + object.cost.parts.toFixed(2) + " parts</div>";
			}
		}
		if(object.cost.met){
			if(!start_timer){
				current_time = 0;
				start_timer = true;
			}
		}
	}
}

var current_time = 1000;
window.setInterval(function(){
	if(start_timer){
		current_time++;
	}
}, 1000/10);
