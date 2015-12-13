$("#batteries").click(function(){
    resources.batteries.progress.clicked = !resources.batteries.progress.clicked;
    resources.batteries.progress.converting = true;
    mouse.display = "Produces " + resources.batteries.produce_rate + " Energy every tick.";
});

$("#wires").click(function(){ 
    resources.wires.progress.clicked = !resources.wires.progress.clicked;
    resources.wires.progress.converting = true;
    mouse.display = "Produces " + resources.wires.produce_rate + " Energy every tick.";
});

$("#lightbulbs").click(function(){
    resources.lightbulbs.progress.clicked = !resources.lightbulbs.progress.clicked;
    resources.lightbulbs.progress.converting = true;
    mouse.display = "Produces " + resources.lightbulbs.produce_rate + " Energy every tick.";
});

$("#generators").click(function(){
    engines.generators.progress.clicked = !engines.generators.progress.clicked;
    engines.generators.progress.converting = true;
    mouse.display = "Produces " + engines.generators.produce_rate + " Energy every tick. " + "Has life time of " + engines.generators.life_time;
});

$("#chargers").click(function(){
    engines.chargers.progress.clicked = !engines.chargers.progress.clicked;
    engines.chargers.progress.converting = true;
    mouse.display = "Produces " + engines.chargers.produce_rate + " Energy every tick." + "Has life time of " + engines.chargers.life_time;;
});

$("#heaters").click(function(){
    engines.heaters.progress.clicked = !engines.heaters.progress.clicked;
    engines.heaters.progress.converting = true;
    mouse.display = "Produces " + engines.heaters.produce_rate + " Energy every tick." + "Has life time of " + engines.heaters.life_time;;
});

$("#thermal").click(function(){
    forms.thermal.progress.clicked = !forms.thermal.progress.clicked;
    forms.thermal.progress.converting = true;
    mouse.display = "Produces " + forms.thermal.produce_rate + " Energy every tick.";
});

$("#chemical").click(function(){
    forms.chemical.progress.clicked = !forms.chemical.progress.clicked;
    forms.chemical.progress.converting = true;
    mouse.display = "Produces " + forms.chemical.produce_rate + " Energy every tick.";
});

$("#solars").click(function(){
    forms.solars.progress.clicked = !forms.solars.progress.clicked;
    forms.solars.progress.converting = true;
    mouse.display = "Produces " + forms.solars.produce_rate + " Energy every tick.";
});

$("#electrical").click(function(){
    forms.electrical.progress.clicked = !forms.electrical.progress.clicked;
    forms.electrical.progress.converting = true;
    mouse.display = "Produces " + forms.electrical.produce_rate + " Energy every tick.";
});


var curr_page = "resources"
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
    } else {
        mouse.display = "<div>You cant access this yet you need " + machines.camera.cost.energy + " energy and " + machines.camera.cost.parts + " parts </div>";
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

$("#resource_bot").click(function(){
    addNewBot(resourceBot);
    mouse.display = "Cost <div>" + resourceBot.cost.batteries.toFixed(2) + " Batteries</div>" + "<div>" + resourceBot.cost.energy.toFixed(2) + " Energy</div>" + "<div>___________</div>" +  "<div>Create with Pure Energy</div>" + "<div>" + resourceBot.cost.pureEnergy.toFixed(2) + " Energy</div>";
});

$("#generator_bot").click(function(){
    addNewBot(generatorBot);
    mouse.display = "Cost <div>" + generatorBot.cost.batteries.toFixed(2) + " Batteries</div>" + "<div>" + generatorBot.cost.wires.toFixed(2) + " Wires</div>" + "<div>" + generatorBot.cost.lightbulbs.toFixed(2) + " Lightbulbs</div>" + "<div>" + generatorBot.cost.energy.toFixed(2) + " Energy</div>" + "<div>___________</div>" +  "<div>Create with Pure Energy</div>" + "<div>" + generatorBot.cost.pureEnergy.toFixed(2) + " Energy</div>" ;
});

$("#forms_bot").click(function(){
    addNewBot(formsBot);
    mouse.display = "Cost <div>" + formsBot.cost.batteries.toFixed(2) + " Batteries</div>" + "<div>" + formsBot.cost.wires.toFixed(2) + " Wires</div>" + "<div>" + formsBot.cost.energy.toFixed(2) + " Energy</div>" + "<div>" + formsBot.cost.generators.toFixed(2) + " generators</div>" + "<div>" + formsBot.cost.chargers.toFixed(2) + " chargers</div>" + "<div>" + formsBot.cost.heaters.toFixed(2) + " Heat Sources</div>" + "<div>___________</div>" +  "<div>Create with Pure Energy</div>" + "<div>" + formsBot.cost.pureEnergy.toFixed(2) + " Energy</div>" ;
});

$(".toolTip").mouseenter(function(){
    mouse.toolTip = true;
});

$(".toolTip").mouseleave(function(){
    mouse.display = "Click Here"
    mouse.toolTip = false;
});

$("#viewport").click(function(){
    addMachines(machines.camera);
    update_machines();
});

$("#automation").click(function(){
    addMachines(machines.automate);
    update_machines();
});

$("#betterAI").click(function(){
    addMachines(machines.botAI);
    update_machines();
});

//options menu//
$("#automation_toggle").click(function(){
    autoClick = !autoClick;
    if(autoClick){
        $("#automation_toggle").css("background-color", "green");
    } else {
        $("#automation_toggle").css("background-color", "transparent");
    }
});

var saveName = "will";
function saving() {
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

var saveObj;
function setObjectArray(object){
  resources_ = [object.resources.batteries, object.resources.wires, object.resources.lightbulbs];
  engines_ = [object.engines.generators, object.engines.chargers, object.engines.heaters];
  forms_ = [object.forms.solars, object.forms.thermal, object.forms.chemical, object.forms.electrical];
  machinesArr = [object.machines.camera, object.machines.automate, object.machines.botAI];
}
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

$("#tooltip_toggle").click(function(){
    mouse.disableTooltip = !mouse.disableTooltip;
    if(mouse.disableTooltip){
        $("#tooltip_toggle").css("background-color", "red");
    } else {
        $("#tooltip_toggle").css("background-color", "transparent");
    }
});

$("#manual_save").click(function(){
    saving();
    alert("Saved!");
});

$("#manual_load").click(function(){
    load();
});
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
