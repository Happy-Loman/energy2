////////////////Ship click events///////////////////////
$("#ship_name_container").click(function(){
    var ship_name = prompt("Name here", "random");
    var n1 = ["Star", "Galaxy", 
    "Galactic", "Space", "Lord", 
    "Alien", "ET", "Ship", "1", "2", "3", "1st", "2nd", "3rd", "Ray", 
    "Niddle", "Meteor", "Apollo", "13", "Plane", "Craft", 
    "Light", "Death", "Star", "Wings", "X", "A", "Fighter",
    "Darth", "First", "Order", "Imperial", "Rebublic", 
    "Slow", "Speed", "Stealth", "Gunner", "Millennium", "Falcon", ""];

    var n2 = ["Star", "Galaxy", 
    "Galactic", "Space", "Lord", 
    "Alien", "ET", "Ship", "1", "2", "3", "1st", "2nd", "3rd", "Ray", 
    "Niddle", "Meteor", "Apollo", "13", "Plane", "Craft", 
    "Light", "Death", "Star", "Wings", "X", "A", "Fighter",
    "Darth", "First", "Order", "Imperial", "Rebublic", 
    "Slow", "Speed", "Stealth", "Gunner", "Millennium", "Falcon", ""];

    var ran_name1 = n1[Math.round(randNum(0, 35))];
    var ran_name2 = n2[Math.round(randNum(0, 35))]; 
    if(ship_name == "random"){
        ship.name = ran_name1 + " " + ran_name2;
    } else {
        if (ship_name == null || ship_name == " "){
            ship.name = ship.name;
        } else {
            ship.name = ship_name;
        }
    }
});
$("#ship_name").hover(function(){
    mouse.display = "Click to name your ship";
});

$("#ship_upgrader").click(function(){
    upgrade_shipcapacity(machines.ship_capacity);
    if(!machines.ship_capacity.avalable){
        mouse.display = "Not yet unlocked.";
    } else {
        mouse.display = "Increase Capacity." + " Costs " + machines.ship_capacity.increase_cost.toFixed(2) + "e"; 
    }
});
$("#ship_upgrader").hover(function(){
    mouse.display = "Increase Capacity." + " Costs " + machines.ship_capacity.increase_cost.toFixed(2) + "e";
});

$("#energy_bar").click(function(){
    window.setTimeout(function(){
        add_energy();
    }, click_delay);
});

$("#energy_bar").hover(function(){
    mouse.display = "This is your ship's energy without it you have no power. Keep it filled by clicking the back bar.";
});

$("#ship_engine").click(function(){
    mouse.display = "Ship's engine. No use for it now, but maybe someday...";
});
$("#ship_engine").hover(function(){
    mouse.display = "Ship's engine. No use for it now, but maybe someday...";
});

$("#ship_shield").click(function(){
    mouse.display = "Stay protected from the forces of space and potential enemies? <div>(Protection is calulated based on how large your ship is to how much energy your ship has.)</div>";
});
$("#ship_shield").hover(function(){
    mouse.display = "Stay protected from the forces of space and potential enemies? <div>(Protection is calulated based on how large your ship is to how much energy your ship has.)</div>";
});

$("#time").click(function(){
    mouse.display = "Can you tell what time it is? (1 minutes in game is 6 seconds)";
});
$("#time").hover(function(){
    mouse.display = "Can you tell what time it is? (1 minutes in game is 6 seconds)";
});

$("#ship_mass").click(function(){
    mouse.display = "As you add parts to this ship, it will grow. <div>(Ship mass is calulated based on how many parts your ship has aquired.)</div>";
});
$("#ship_mass").hover(function(){
    mouse.display = "As you add parts to this ship, it will grow. <div>(Ship mass is calulated based on how many parts your ship has aquired.)</div>";
});

$("#ship_energy_rate").click(function(){
    mouse.display = "It takes this much energy to power all the BOTS and components of this ship";
});
$("#ship_energy_rate").hover(function(){
    mouse.display = "It takes this much energy to power all the BOTS and components of this ship";
});

$("#ship_oxygen_lvl").click(function(){
    mouse.display = "The percentage of the ship that has oxygen. Water gets converted into oxygen over time.";
});
$("#ship_oxygen_lvl").hover(function(){
    mouse.display = "The percentage of the ship that has oxygen. Water gets converted into oxygen over time.";
});

$("#ship_food").click(function(){
    mouse.display = "How can u live without food? Animals your BOTS harvest will be turned to food. Some may rot over time.";
});
$("#ship_food").hover(function(){
    mouse.display = "How can u live without food? Animals your BOTS harvest will be turned to food. Some may rot over time.";
});

$("#ship_gravity").click(function(){
    mouse.display = "As your ship grows you will gain mass and thus have a larger gravitational pull. Possibly being the envy of the galaxy.";
});
$("#ship_gravity").hover(function(){
    mouse.display = "As your ship grows you will gain mass and thus have a larger gravitational pull. Possibly being the envy of the galaxy.";
});

////////////////Ship click events End//////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////


/////////////////Resources Click events/////////////////////
$("#batteries").click(function(){
    window.setTimeout(function(){
        resources.batteries.progress.clicked = !resources.batteries.progress.clicked;
        resources.batteries.progress.converting = true;
    }, click_delay);
    mouse.display = "Produces " + (resources.batteries.produce_rate).toFixed(2) + " Energy every tick.";
});
$("#batteries").hover(function(){
    mouse.display = "Produces " + (resources.batteries.produce_rate).toFixed(2) + " Energy every tick.";
});

$("#wires").click(function(){ 
    window.setTimeout(function(){
        resources.wires.progress.clicked = !resources.wires.progress.clicked;
        resources.wires.progress.converting = true;
    }, click_delay);
    mouse.display = "Produces " + (resources.wires.produce_rate).toFixed(2) + " Energy every tick.";
});
$("#wires").hover(function(){ 
    mouse.display = "Produces " + (resources.wires.produce_rate).toFixed(2) + " Energy every tick.";
});

$("#lightbulbs").click(function(){
    window.setTimeout(function(){
        resources.lightbulbs.progress.clicked = !resources.lightbulbs.progress.clicked;
        resources.lightbulbs.progress.converting = true;
    }, click_delay);
    mouse.display = "Produces " + (resources.lightbulbs.produce_rate).toFixed(2) + " Energy every tick.";
});
$("#lightbulbs").hover(function(){
    mouse.display = "Produces " + (resources.lightbulbs.produce_rate).toFixed(2) + " Energy every tick.";
});

$("#water").click(function(){
    window.setTimeout(function(){
        resources.water.progress.clicked = !resources.water.progress.clicked;
        resources.water.progress.converting = true;
    }, click_delay);
    mouse.display = "Produces " + (resources.water.produce_rate).toFixed(2) + " drops of water every tick. To be converted into oxygen";
});
$("#water").hover(function(){
    mouse.display = "Produces " + (resources.water.produce_rate).toFixed(2) + " drops of water every tick. To be converted into oxygen";
});

$("#animals").click(function(){
    window.setTimeout(function(){
        resources.animals.progress.clicked = !resources.animals.progress.clicked;
        resources.animals.progress.converting = true;
    }, click_delay);
    mouse.display = "Produces " + (resources.animals.produce_rate).toFixed(2) + " pounds of food every tick.";
});
$("#animals").hover(function(){
    mouse.display = "Produces " + (resources.animals.produce_rate).toFixed(2) + " pounds of food every tick.";
});

$("#generators").click(function(){
    window.setTimeout(function(){
        engines.generators.progress.clicked = !engines.generators.progress.clicked;
        engines.generators.progress.converting = true;   
    }, click_delay);
    mouse.display = "Produces " + (engines.generators.produce_rate).toFixed(2) + " Energy every tick. " + "Has life time of " + engines.generators.life_time.toFixed(2);
});
$("#generators").hover(function(){
    mouse.display = "Produces " + (engines.generators.produce_rate).toFixed(2) + " Energy every tick. " + "Has life time of " + engines.generators.life_time.toFixed(2);
});

$("#chargers").click(function(){
    window.setTimeout(function(){
        engines.chargers.progress.clicked = !engines.chargers.progress.clicked;
        engines.chargers.progress.converting = true;
    }, click_delay);
    mouse.display = "Produces " + (engines.chargers.produce_rate).toFixed(2) + " Energy every tick." + "Has life time of " + engines.chargers.life_time.toFixed(2);
});
$("#chargers").hover(function(){
    mouse.display = "Produces " + (engines.chargers.produce_rate).toFixed(2) + " Energy every tick." + "Has life time of " + engines.chargers.life_time.toFixed(2);
});

$("#heaters").click(function(){
    window.setTimeout(function(){
        engines.heaters.progress.clicked = !engines.heaters.progress.clicked;
        engines.heaters.progress.converting = true;
    }, click_delay);
    mouse.display = "Produces " + (engines.heaters.produce_rate).toFixed(2) + " Energy every tick." + "Has life time of " + engines.heaters.life_time.toFixed(2);
});
$("#heaters").hover(function(){
    mouse.display = "Produces " + (engines.heaters.produce_rate).toFixed(2) + " Energy every tick." + "Has life time of " + engines.heaters.life_time.toFixed(2);
});

$("#thermal").click(function(){
    window.setTimeout(function(){
        forms.thermal.progress.clicked = !forms.thermal.progress.clicked;
        forms.thermal.progress.converting = true;
    }, click_delay);
    mouse.display = "Produces " + (forms.thermal.produce_rate).toFixed(2) + " Energy every tick.";
});
$("#thermal").hover(function(){
    mouse.display = "Produces " + (forms.thermal.produce_rate).toFixed(2) + " Energy every tick.";
});

$("#chemical").click(function(){
    window.setTimeout(function(){
        forms.chemical.progress.clicked = !forms.chemical.progress.clicked;
        forms.chemical.progress.converting = true;
    }, click_delay);
    mouse.display = "Produces " + (forms.chemical.produce_rate).toFixed(2) + " Energy every tick.";
});
$("#chemical").hover(function(){
    mouse.display = "Produces " + (forms.chemical.produce_rate).toFixed(2) + " Energy every tick.";
});

$("#solars").click(function(){
    window.setTimeout(function(){
        forms.solars.progress.clicked = !forms.solars.progress.clicked;
        forms.solars.progress.converting = true;
    }, click_delay);
    mouse.display = "Produces " + (forms.solars.produce_rate).toFixed(2) + " Energy every tick.";
});
$("#solars").hover(function(){
    mouse.display = "Produces " + (forms.solars.produce_rate).toFixed(2) + " Energy every tick.";
});

$("#electrical").click(function(){
    window.setTimeout(function(){
        forms.electrical.progress.clicked = !forms.electrical.progress.clicked;
        forms.electrical.progress.converting = true;
    }, click_delay);
    mouse.display = "Produces " + (forms.electrical.produce_rate).toFixed(2) + " Energy every tick.";
});
$("#electrical").hover(function(){
    mouse.display = "Produces " + (forms.electrical.produce_rate).toFixed(2) + " Energy every tick.";
});
/////////////////Resources Click events end/////////////////////
///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

/////////////////Navigation Click events/////////////////////
var curr_page = "ship"
$("#ship_nav").click(function(){
    $("#" + curr_page).toggleClass("not_displayed");
    $("#ship").toggleClass("not_displayed");
    curr_page = "ship";
});

$("#resources_nav").click(function(){
    $("#" + curr_page).toggleClass("not_displayed");
    $("#resources").toggleClass("not_displayed");
    curr_page = "resources";
});

$("#generator_nav").click(function(){
    $("#" + curr_page).toggleClass("not_displayed");
    $("#generator").toggleClass("not_displayed");
    curr_page = "generator";
});

$("#canvas_nav").click(function(){
    if(machines.camera.avalable){
        $("#" + curr_page).toggleClass("not_displayed");
        $("#canvas_").toggleClass("not_displayed");
        curr_page = "canvas_";
    }
});

$("#forms_nav").click(function(){
    $("#" + curr_page).toggleClass("not_displayed");
    $("#forms").toggleClass("not_displayed");
    curr_page = "forms";
});

$("#upgrades_nav").click(function(){
    $("#" + curr_page).toggleClass("not_displayed");
    $("#upgrades").toggleClass("not_displayed");
    curr_page = "upgrades";
});

$("#settings_nav").click(function(){
    $("#" + curr_page).toggleClass("not_displayed");
    $("#settings").toggleClass("not_displayed");
    curr_page = "settings";
});

$("#bots_nav").click(function(){
    $("#" + curr_page).toggleClass("not_displayed");
    $("#bots").toggleClass("not_displayed");
    curr_page = "bots";
});
///////////////Navigation Click events end///////////////////
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

/////////////////BOTs Click events/////////////////////
$("#resource_bot").click(function(){
    addNewBot(resourceBot);
    mouse.display = "Cost <div>" + resourceBot.cost.batteries.toFixed(2) + " Batteries</div>" + "<div>" + resourceBot.cost.energy.toFixed(2) + " Energy</div>" + "<div>___________</div>" +  "<div>Create with Pure Energy</div>" + "<div>" + resourceBot.cost.pureEnergy.toFixed(2) + " Energy</div>";
});
$("#resource_bot").hover(function(){
    mouse.display = "Cost <div>" + resourceBot.cost.batteries.toFixed(2) + " Batteries</div>" + "<div>" + resourceBot.cost.energy.toFixed(2) + " Energy</div>" + "<div>___________</div>" +  "<div>Create with Pure Energy</div>" + "<div>" + resourceBot.cost.pureEnergy.toFixed(2) + " Energy</div>";
});

$("#generator_bot").click(function(){
    addNewBot(generatorBot);
    mouse.display = "Cost <div>" + generatorBot.cost.batteries.toFixed(2) + " Batteries</div>" + "<div>" + generatorBot.cost.wires.toFixed(2) + " Wires</div>" + "<div>" + generatorBot.cost.lightbulbs.toFixed(2) + " Lightbulbs</div>" + "<div>" + generatorBot.cost.energy.toFixed(2) + " Energy</div>" + "<div>___________</div>" +  "<div>Create with Pure Energy</div>" + "<div>" + generatorBot.cost.pureEnergy.toFixed(2) + " Energy</div>" ;
});
$("#generator_bot").hover(function(){
    mouse.display = "Cost <div>" + generatorBot.cost.batteries.toFixed(2) + " Batteries</div>" + "<div>" + generatorBot.cost.wires.toFixed(2) + " Wires</div>" + "<div>" + generatorBot.cost.lightbulbs.toFixed(2) + " Lightbulbs</div>" + "<div>" + generatorBot.cost.energy.toFixed(2) + " Energy</div>" + "<div>___________</div>" +  "<div>Create with Pure Energy</div>" + "<div>" + generatorBot.cost.pureEnergy.toFixed(2) + " Energy</div>" ;
});

$("#forms_bot").click(function(){
    addNewBot(formsBot);
    mouse.display = "Cost <div>" + formsBot.cost.batteries.toFixed(2) + " Batteries</div>" + "<div>" + formsBot.cost.wires.toFixed(2) + " Wires</div>" + "<div>" + formsBot.cost.energy.toFixed(2) + " Energy</div>" + "<div>" + formsBot.cost.generators.toFixed(2) + " generators</div>" + "<div>" + formsBot.cost.chargers.toFixed(2) + " chargers</div>" + "<div>" + formsBot.cost.heaters.toFixed(2) + " Heat Sources</div>" + "<div>___________</div>" +  "<div>Create with Pure Energy</div>" + "<div>" + formsBot.cost.pureEnergy.toFixed(2) + " Energy</div>" ;
});
$("#forms_bot").hover(function(){
    mouse.display = "Cost <div>" + formsBot.cost.batteries.toFixed(2) + " Batteries</div>" + "<div>" + formsBot.cost.wires.toFixed(2) + " Wires</div>" + "<div>" + formsBot.cost.energy.toFixed(2) + " Energy</div>" + "<div>" + formsBot.cost.generators.toFixed(2) + " generators</div>" + "<div>" + formsBot.cost.chargers.toFixed(2) + " chargers</div>" + "<div>" + formsBot.cost.heaters.toFixed(2) + " Heat Sources</div>" + "<div>___________</div>" +  "<div>Create with Pure Energy</div>" + "<div>" + formsBot.cost.pureEnergy.toFixed(2) + " Energy</div>" ;
});
/////////////////BOTs Click events end/////////////////////
//////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

/////////////////Tool Tip Click events/////////////////////
$(".toolTip").mouseenter(function(){
    mouse.toolTip = true;
});

$(".toolTip").mouseleave(function(){
    mouse.toolTip = false;
});
/////////////////Tool Tip Click events end/////////////////
//////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

/////////////////Upgrades Click events/////////////////
$("#more_storage").click(function(){
    addMachines(machines.ship_capacity);
    update_machines();
    mouse.display = "<div>You need " + machines.ship_capacity.cost.energy.toFixed(2) + " energy and " + machines.ship_capacity.cost.parts.toFixed(2) + " parts to access this yet you need</div>";
});
$("#more_storage").hover(function(){
    mouse.display = "<div>You need " + machines.ship_capacity.cost.energy.toFixed(2) + " energy and " + machines.ship_capacity.cost.parts.toFixed(2) + " parts to access this yet you need</div>";
});

$("#viewport").click(function(){
    addMachines(machines.camera);
    update_machines();
    mouse.display = "<div>You need " + machines.camera.cost.energy.toFixed(2) + " energy and " + machines.camera.cost.parts.toFixed(2) + " parts to access this yet you need</div>";
});
$("#viewport").hover(function(){
    mouse.display = "<div>You need " + machines.camera.cost.energy.toFixed(2) + " energy and " + machines.camera.cost.parts.toFixed(2) + " parts to access this yet you need</div>";
});

$("#automation").click(function(){
    addMachines(machines.automate);
    update_machines();
    mouse.display = "<div>You need " + machines.automate.cost.energy.toFixed(2) + " energy and " + machines.automate.cost.parts.toFixed(2) + " parts to access this yet you need</div>";
});
$("#automation").hover(function(){
    mouse.display = "<div>You need " + machines.automate.cost.energy.toFixed(2) + " energy and " + machines.automate.cost.parts.toFixed(2) + " parts to access this yet you need</div>";
});

$("#convert_all").click(function(){
    addMachines(machines.convert_all);
    update_machines();
    mouse.display = "<div>You need " + machines.convert_all.cost.energy.toFixed(2) + " energy and " + machines.convert_all.cost.parts.toFixed(2) + " parts to access this yet you need</div>";
});
$("#convert_all").hover(function(){
    mouse.display = "<div>You need " + machines.convert_all.cost.energy.toFixed(2) + " energy and " + machines.convert_all.cost.parts.toFixed(2) + " parts to access this yet you need</div>";
});

$("#betterAI").click(function(){
    addMachines(machines.botAI);
    update_machines();
    mouse.display = machines.botAI.display;
});
$("#betterAI").hover(function(){
    mouse.display = machines.botAI.display;
});
/////////////////Upgrades Click events end/////////////////
//////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

//options menu//
$("#automation_toggle").click(function(){
    autoClick = !autoClick;
    if(autoClick){
        $("#automation_toggle").css("background-color", "green");
    } else {
        $("#automation_toggle").css("background-color", "transparent");
    }
});

$("#convert_all_toggle").click(function(){
    convertAll = !convertAll;
    if(convertAll){
        $("#convert_all_toggle").css("background-color", "green");
    } else {
        $("#convert_all_toggle").css("background-color", "transparent");
    }
});

$("#tooltip_toggle").click(function(){
    mouse.disableTooltip = !mouse.disableTooltip;
    if(mouse.disableTooltip){
        $("#tooltip_toggle").css("background-color", "red");
    } else {
        $("#tooltip_toggle").css("background-color", "transparent");
    }
});

var saveName = "energy_save1";
function saving() {
    var save = {
        ship:ship,
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

var saveObj;
function setObjectArray(object){
  resources_ = [resources.batteries, resources.wires, resources.lightbulbs, resources.water, resources.animals];
  engines_ = [object.engines.generators, object.engines.chargers, object.engines.heaters];
  forms_ = [object.forms.solars, object.forms.thermal, object.forms.chemical, object.forms.electrical];
  machinesArr = [machines.ship_capacity, machines.camera, machines.automate, machines.convert_all, machines.botAI];
}

var loaded = false;
function load() {
    saveObj = JSON.parse(localStorage.getItem(saveName));
    ship = saveObj.ship;
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
    alert("loaded");
    loaded = true;
}

$("#manual_save").click(function(){
    saving();
    alert("saved");
});

$("#manual_load").click(function(){
    load();
});

$("#quick_save").click(function(){
    saving();
    alert("saved");
});
$(".get_data").mouseenter(function(){
    $(".get_data").addClass("show_get_data");
});
$(".get_data").mouseleave(function(){
    $(".get_data").removeClass("show_get_data");
});

$("#quick_load").click(function(){
    load();
});

window.setInterval(function(){
    if(loaded){
        saving();
    }
}, 1000);
//options menu end//

/*var keyPressed = [];
window.onkeydown = function(e){
  e = e || window.event;
  keyPressed[e.keyCode] = true;
  e.preventDefault();
  if(keyPressed[83]){
    saving();
    alert("Saved");
    console.log("save that");
  }

  if(keyPressed[68]){
    load();
    alert("loaded");
    console.log("load that");
  }
};

window.onkeyup = function(e){
  e = e || window.event;
  var code = e.which || e.keyCode;
  keyPressed[e.keyCode] = false;
  e.preventDefault();
  if(code === 83){ 
    return 0;
  }

  if(code === 68){
    return 0;
  }
};*/

/*function restart(){
    for(var i = 0; i < bots.length; i++){
        var bot = bots[i];
        bot.active = false;
        bot.launching = false;
        freshStart = true;
    }
    loadOgState();
}*/

$("#restartButton").click(function(){
    //restart();
});
