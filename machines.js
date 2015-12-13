var machines = {
	camera: {
		type:"camera",
		avalable:false,
		cost: {
			energy:20000,
			parts:125,
			met:false,
		},
		id:"viewport",
	},

	automate: {
		type: "automate",
		avalable: false,
		cost: {
			energy:3000,
			parts:75,
			met:false,
		},
		id:"automation",
	},

	botAI: {
		type: "botAI",
		avalable: false,
		smartness:0,
		cost: {
			energy: 912500,
			parts:13200,
			met:false,
		},
		id:"betterAI",
	},
}

var machinesArr = [machines.camera, machines.automate, machines.botAI];
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
		}
	}
}

function checkMachinesCostMet(object){
	if(cell.energy >= object.cost.energy && parts.amount >= object.cost.parts){
		cell.energy -= object.cost.energy;
		parts.amount -= object.cost.parts;

		object.cost.met = true;
		if(object.type == "botAI"){
			object.cost.energy += (object.cost.energy * 0.5);
			object.cost.parts += (object.cost.parts * 0.5);
		}
	} else {
		object.cost.met = false;
	}
}

function addMachines(object){
	checkMachinesCostMet(object);
	if(!object.cost.met){
		mouse.display = "<div>You cant access this yet you need " + object.cost.energy.toFixed(2) + " energy and " + object.cost.parts.toFixed(2) + " parts </div>";
		return 0;
	}

	if(object.type == "camera"){
		object.avalable = true;
	}

	if(object.type == "automate"){
		object.avalable = true;
		mouse.display = "Check your options";
	}

	if(object.type == "botAI"){
		for(var i = 0; i < bots.length; i++){
			var b = bots[i];
			if(!(b.smartness <= 20)){
				b.smartness -= 1;
				object.smartness += 1;
			} else {
				object.avalable = true;
			}
		} 
		mouse.display = "BOT \"smartness\":[" + object.smartness + "]" + "<div>Next upgrade</div>" + object.cost.energy.toFixed(2) + " Energy " + object.cost.parts.toFixed(2) + " parts</div>";
	}	
}
