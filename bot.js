var bots = [];

var botFarm = {
    energyForNextBot: 10,
    energyForNextBotGrowthRate: 3.5,
    CTF: 5,
    PR: 50,
    MS: 200,
    botIndx:0,
}

var resourceBot = {
    type:"resource",
    color:"white",
    amount:1,
    cost: {
        batteries: 110,
        energy: 70,
        pureEnergy: 1101200,
        met:false,
    },
    id:"resource_bot_number",
}

var generatorBot = {
    type: "engines",
    color:"lightblue",
    amount:0,
    cost: {
        batteries: 1000,
        wires:600,
        lightbulbs:540,
        energy: 1100,
        pureEnergy: 1000000 * 10.2,
        met:false,
    },
    id:"generator_bot_number",
}

var formsBot = {
    type: "forms",
    color:"red",
    amount:0,
    cost: {
        batteries: 450,
        wires:320,
        energy: 10010,
        generators: 54,
        chargers: 35,
        heaters: 24,
        pureEnergy: 1000000 * 24.8,
        met:false,
    },
    id:"forms_bot_number",
}

function checkBotCostMet(object){
    if(object.type == "resource"){
        if((resources.batteries.amount >= object.cost.batteries && cell.energy >= object.cost.energy)){
            resources.batteries.amount -= object.cost.batteries;
            cell.energy -= object.cost.energy;
            object.cost.met = true;
            object.cost.batteries += (object.cost.batteries * 0.5);
            object.cost.energy += (object.cost.energy * 0.5);
        } else if(cell.energy > object.cost.pureEnergy){
            cell.energy -= object.cost.pureEnergy;
            object.cost.pureEnergy += (object.cost.energy * 0.5);
            object.cost.met = true;
        }else {
            object.cost.met = false;
        }
    }

    if(object.type == "engines"){
        if((resources.batteries.amount >= object.cost.batteries && resources.wires.amount >= object.cost.energy && resources.lightbulbs.amount >= object.cost.lightbulbs && cell.energy >= object.cost.energy)){
            resources.batteries.amount -= object.cost.batteries;
            resources.wires.amount -= object.cost.wires;
            resources.lightbulbs.amount -= object.cost.lightbulbs;
            cell.energy -= object.cost.energy;

            object.cost.met = true;

            object.cost.batteries += (object.cost.batteries * 0.5);
            object.cost.wires += (object.cost.wires * 0.5);
            object.cost.lightbulbs += (object.cost.lightbulbs * 0.5);
            object.cost.energy += (object.cost.energy * 0.5);
        } else if(cell.energy > object.cost.pureEnergy){
            cell.energy -= object.cost.pureEnergy;
            object.cost.pureEnergy += (object.cost.energy * 0.5);
            object.cost.met = true;
        }else {
            object.cost.met = false;
        }
    }

    if(object.type == "forms"){
        if((resources.batteries.amount >= object.cost.batteries && resources.wires.amount >= object.cost.wires && engines.generators.amount >= object.cost.generators && engines.chargers.amount >= object.cost.chargers && engines.heaters.amount >= object.cost.heaters && cell.energy >= object.cost.energy)){
            resources.batteries.amount -= object.cost.batteries;
            resources.wires.amount -= object.cost.wires;
            engines.generators.amount -= object.cost.generators;
            engines.chargers.amount -= object.cost.chargers;
            engines.heaters.amount -= object.cost.heaters;
            cell.energy -= object.cost.energy;

            object.cost.met = true;

            object.cost.batteries += (object.cost.batteries * 0.5);
            object.cost.wires += (object.cost.wires * 0.5);

            object.cost.generators += (object.cost.generators * 0.5);
            object.cost.chargers += (object.cost.chargers * 0.5);
            object.cost.heaters += (object.cost.heaters * 0.5);
            object.cost.energy += (object.cost.energy * 0.5);
            object.cost.energy += (object.cost.energy * 0.5);
        } else if(cell.energy > object.cost.pureEnergy){
            cell.energy -= object.cost.pureEnergy;
            object.cost.pureEnergy += (object.cost.pureEnergy * 0.5);
            object.cost.met = true;
        } else {
            object.cost.met = false;
        }
    }
}
var activeBots = botFarm.botIndx;

function addNewBot(object){
    checkBotCostMet(object);
    if(!object.cost.met){
        return 0;
    }
    object.amount++;
    bots.push({
        object:object,
        id: object.id,
        indx: botFarm.botIndx,
        single:true,
        x: cw/2,
        y: ch/2,
        r: 5,
        og_r:5,
        color: object.color,
        text_color:"white",
        last_find:"nothing",
        //100 is bad//
        smartness:1000, //Betwwen 20 and 100//
        find_per_tick:1,
        AI_lvl:0,
        finds_for_next_lvl:500,
        og_finds_for_next_lvl:500,
        total_finds:0,
        vx: randNum(-10, 10),
        vy: randNum(-10, 10),
        speed: 10,
        energy:1,
        type:object.type,
        launching: true,
        active:true,       
        time: {
            curr:0,
            max: 1000,//seconds
        }, 
        storage: {
            resource_amount:0,
            max: 100,
        },                                                                                                                                                                                                                                                                                                                                                                    
    });
    botFarm.botIndx++;
    activeBots++;
}

function addNewBot_(type){
    bots.push({
        object:resourceBot,
        id:"resource_bot_number",
        indx: botFarm.botIndx,
        single:true,
        x: cw/2,
        y: ch/2,
        r: 5,
        og_r:5,
        color: "red",
        text_color:"white",
        last_find:"nothing",
        //100 is bad//
        smartness:1000, //Betwwen 20 and 100//
        find_per_tick:1,
        AI_lvl:0,
        finds_for_next_lvl:500,
        og_finds_for_next_lvl:500,
        total_finds:0,
        vx: randNum(-10, 10),
        vy: randNum(-10, 10),
        speed: 10,
        energy:1,
        type:type,
        launching: true,
        active:true,     
        time: {
            curr:0,
            max: 500,//seconds
        },      
        storage: {
            resource_amount:0,
            max: 100,
        },                                                                                                                                                                                                                                                                                                                                                             
    });
    botFarm.botIndx++;
    activeBots++;
}

function bot_draw(){
    ctx.save();
    ctx.translate((offset.directionX), (offset.directionY));
    for (var i = 0; i < bots.length; i++) {
        var bot = bots[i];

        ctx.beginPath();
        ctx.font = "30px Arial";
        ctx.fillStyle = bot.text_color;
        ctx.fillText("BOT: " + (bot.indx + 1),bot.x + 10,bot.y + 10);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(bot.x, bot.y, bot.r, 0, (2 * Math.PI));
        ctx.fillStyle = bot.color;
        ctx.fill();
    };
    ctx.restore();
}

addNewBot_("resource");
var pg = $('#bots_subpage');
function addDiv(text){
    return "<div id=\"bot_display\" class=\"button\">" + text + "</div>";
}

var bot_display_text;
var page = 1;
function display_bots(){
    GID("bots_subpage").innerHTML = "";
    if(bots.length <= 100){
        for(var i = 0; i < bots.length; i++){
            var bot = bots[i];
            bot_display_text = "<div id=\"bot_display_" + i + "\" class=\"bot_display\">" + "<h2>" + "BOT " + (i+1) + "</h2>" + "<span class=\"box\">"+bot.type.toUpperCase()+"</span>" + "<div class=\"toolTip\">AI Level: " + bot.AI_lvl.toFixed(0) + "</div> <div>Next Level: " + (bot.finds_for_next_lvl - bot.total_finds).toFixed(0) + "</div> <div id=\"bot_progress" + i + "\" class=\"bot_progressbar\">" + (bot.time.max-bot.time.curr).toFixed(0) + "</div> <div>Last Find: " + bot.last_find + "</div> </div>";
            pg.append(bot_display_text);

            "<div id=\"bot_display + \i\ + \"" + "> </div>"
        }
    } else {
        for(var i = 0; i < 100; i++){
            var bot = bots[i];
            bot_display_text = "<div id=\"bot_display_" + i + "\" class=\"bot_display\">" + "<h2>" + "BOT " + (i+1) + "</h2>" + "<span class=\"box\">"+bot.type.toUpperCase()+"</span>" + "<div class=\"toolTip\">AI Level: " + bot.AI_lvl.toFixed(0) + "</div> <div>Next Level: " + (bot.finds_for_next_lvl - bot.total_finds).toFixed(0) + "</div> <div id=\"bot_progress" + i + "\" class=\"bot_progressbar\">" + (bot.time.max-bot.time.curr).toFixed(0) + "</div> <div>Last Find: " + bot.last_find + "</div> </div>";
            pg.append(bot_display_text);

            "<div id=\"bot_display + \i\ + \"" + "> </div>"
        }
    } /*else {
        for(var i = (page * 2); i < ((page * 2) * 2); i++){
            var bot = bots[i];
            bot_display_text = "<div id=\"bot_display\" class=\"bot_display\">" + "<h2>" + "BOT " + (i+1) + "</h2>" + bot.type.toUpperCase() + " BOT <div>AI Level: " + bot.AI_lvl + "</div> <div>Progress: " + (bot.storage.resource_amount/bot.storage.max*100).toFixed(1) + "%</div> <div>Active: " + bot.active + "</div> </div>";
            pg.append(bot_display_text);
        }
    }*/
}

var freshStart = false;
function bot_update(){
    var id = 0;
    for (var i = 0; i < bots.length; i++) {
        var bot = bots[i];
        bot.x += bot.vx;
        bot.y += bot.vy;

        if(bot.total_finds >= bot.finds_for_next_lvl){
            bot.AI_lvl += 1;
            bot.finds_for_next_lvl = bot.og_finds_for_next_lvl + (bot.og_finds_for_next_lvl * 0.48);
            bot.og_finds_for_next_lvl = bot.finds_for_next_lvl;
            bot.storage.max += Math.round(bot.storage.max * 0.7);
        }


        bot.find_per_tick = (bot.AI_lvl + 1);

        if(bot_checkCollision(bot, cell) && !bot.active){
            cell.absorbEnergy(bot, 0);
            //console.log(cell.energy);
        }

        if(bot_checkCollision(bot, cell) && freshStart){
            bots.splice(bot.indx, 1, 0);
        }

        if(return_distance(bot.x, bot.y, cell.x, cell.y) < cell.r){
            bot.launching = true;
            bot.vx = Math.cos(randNum(0, 360)) * bot.speed;
            bot.vy = Math.sin(randNum(0, 360)) * bot.speed;
        } else {
            bot.launching = false;
        }

        if(bot.active && !bot.launching){
            bot.r = bot.og_r;
            bot_gather(bot);
        } else {
            bot_return_to_cell(bot);
            if(bot_checkCollision(bot, cell)){
                bot.vx = -bot.vx;
                bot.vy = -bot.vy;
            }
        }
        GID(bot.id).innerHTML = bot.object.amount;
    };
    if(curr_page == "bots"){
        display_bots();
    }
    for(var i = 0; i < bots.length; i++){
        var bot = bots[i];
        $("#bot_progress" + i).css("width", ((bot.time.curr/bot.time.max) * 180) + "px");
    }
}

function bot_gather(object){
    var ran =  randNum(0, object.smartness);
    object.color = "White";
    var ang = return_angle(object.x, object.y, randNum(map_w, -map_w), randNum(map_h, -map_h));
    if(object.type == "resource"){
        object.time.curr++;//update the bot active time//
        var res = resources_[Math.round(randNum(0, 4))];
        //Check if bot time has reached peak//
        if(object.time.curr >= object.time.max){
            res.amount += object.storage.resource_amount;
            if(res.types.second == "energy"){
                parts.amount += object.storage.resource_amount;
            }
            object.last_find = object.storage.resource_amount + " " + res.resource;
            object.storage.resource_amount = 0;
            object.time.curr = 0;
        }
        if(ran < res.rarity){
            object.storage.resource_amount += object.find_per_tick;
            object.total_finds += object.find_per_tick;
            if(object.storage.resource_amount >= object.storage.max){
                res.amount += object.storage.resource_amount;
                if(res.types.second != "energy"){
                    parts.amount += object.storage.resource_amount;
                }
                object.last_find = object.storage.resource_amount + " " + res.resource;
                object.storage.resource_amount = 0;
                object.time.curr = 0;
            }
        }
    } else if(object.type == "engines"){
        object.time.curr++;//add one to the bot active time//
        var eng = engines_[Math.round(randNum(0, 2))];
        //Check if bot time has reached peak//
        if(object.time.curr >= object.time.max){
            eng.amount += object.storage.resource_amount;
            object.last_find = object.storage.resource_amount + " " + eng.resource;
            object.storage.resource_amount = 0;
            object.time.curr = 0;
        }
        if(ran < eng.rarity){
            var rand = randNum(0, 50);
            if(rand < 40){
                object.storage.resource_amount += object.find_per_tick;
                object.total_finds += object.find_per_tick;
                if(object.storage.resource_amount >= object.storage.max){
                    eng.amount += object.storage.resource_amount;
                    parts.amount += object.storage.resource_amount;
                    object.last_find = object.storage.resource_amount + " " + eng.resource;
                    object.storage.resource_amount = 0;
                    object.time.curr = 0;
                }
            }
        }
    } else if(object.type == "forms"){
        object.time.curr++;//add one to the bot active time//
        var form = forms_[Math.round(randNum(0, 3))];
        //Check if bot time has reached peak//
        if(object.time.curr >= object.time.max){
            form.amount += object.storage.resource_amount;
            object.last_find = object.storage.resource_amount + " " + form.resource;
            object.storage.resource_amount = 0;
            object.time.curr = 0;
        }
        if(ran < form.rarity){
            var rand = randNum(0, 60);
            if(rand < 3){
                object.storage.resource_amount += object.find_per_tick;
                object.total_finds += object.find_per_tick;
                if(object.storage.resource_amount >= object.storage.max){
                    form.amount += object.storage.resource_amount;
                    parts.amount += object.storage.resource_amount;
                    object.last_find = object.storage.resource_amount + " " + eng.resource;
                    object.storage.resource_amount = 0;
                    object.time.curr = 0;
                }
            }
        }
    }

    if(ran < 2 && !bot_checkCollision(object, cell)){
        object.vx = Math.cos(ang) * -object.speed;
        object.vy = Math.sin(ang) * -object.speed;
    }

    if(object.energy >= object.max_storage){
        activeBots--;
        object.active = false;
    }
}

function bot_return_to_cell(object){
    object.color = "red";
    var ang = return_angle(object.x, object.y, cell.x, cell.y);
    object.vx = Math.cos(ang) * -object.speed;
    object.vy = Math.sin(ang) * -object.speed;
}

function bot_checkCollision(object, object2){
    //check against 1 object
    if(object2.single){
        var dis = return_distance(object.x, object.y, object2.x, object2.y);
        if(dis < (object.r) + object2.r){
            return true;
        }
    } else {
    //check againt multiple objects
        for (var i = 0; i < object2.length; i++) {
            var obj2 = object2[i];
            var dis = return_distance(object.x, object.y, obj2.x, obj2.y);
            if (dis < (object.r) + obj2.r) {
                return true;
            }
        }
    }
}

function bot_absorbEnergy(object, object2, amount){
    if(object2.single){
        if(amount <= 0){
            object.energy += object2.energy;
            object2.energy = 0;
        } else {
            object.energy += amount;
            object2.energy -= amount;
        }
    } else {
        for (var i = 0; i < object2.length; i++) {
            var obj = object2[i];
            var player_dToPkt = return_distance(object.x, object.y, obj.x, obj.y);

            if ((player_dToPkt < (object.r) + obj.r)) {  
                if(amount > 0){
                    object.energy += amount;
                    obj.energy -= amount;
                } else {
                    object.energy += obj.energy;
                    obj.energy -= obj.energy;
                }
                object2.splice(obj.pos, 1, 0);
            }
        }
    };
}
//Display all bots on the page//

//var innerDiv = document.createElement('div');
//innerDiv.className = 'block-2';
//iDiv.appendChild(innerDiv)
