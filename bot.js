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
        batteries: 2000,
        wires:1100,
        lightbulbs:940,
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
        generators: 20,
        chargers: 35,
        heaters: 54,
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
            engines.engines.chargers.amount -= object.cost.chargers;
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
            object.cost.pureEnergy += (object.cost.energy * 0.5);
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
    GID(object.id).innerHTML = object.amount;
    bots.push({
        indx: botFarm.botIndx,
        single:true,
        x: cw/2,
        y: ch/2,
        r: 5,
        og_r:5,
        color: object.color,
        text_color:"white",
        //100 is bad//
        smartness:100, //Betwwen 20 and 100//
        vx: randNum(-10, 10),
        vy: randNum(-10, 10),
        speed: 10,
        energy:1,
        type:object.type,
        chanceToFind:botFarm.CTF,
        produceRate:botFarm.PR,
        max_storage:botFarm.MS,
        launching: true,
        active:true,                                                                                                                                                                                                                                                                                                                                                                      
    });
    botFarm.botIndx++;
    activeBots++;
}

function addNewBot_(type){
    bots.push({
        indx: botFarm.botIndx,
        single:true,
        x: cw/2,
        y: ch/2,
        r: 5,
        og_r:5,
        color: "red",
        text_color:"white",
        //100 is bad//
        smartness:100, //Betwwen 20 and 100//
        vx: randNum(-10, 10),
        vy: randNum(-10, 10),
        speed: 10,
        energy:1,
        type:type,
        chanceToFind:botFarm.CTF,
        produceRate:botFarm.PR,
        max_storage:botFarm.MS,
        launching: true,
        active:true,                                                                                                                                                                                                                                                                                                                                                                      
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

var freshStart = false;
function bot_update(){
    for (var i = 0; i < bots.length; i++) {
        var bot = bots[i];
        bot.x += bot.vx;
        bot.y += bot.vy;

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
    };
}

/*function get_bot_info(index){
    if(botIndx > 0){
        bot = bots[index];
        UI.bot.botNum = bot.indx + 1;
        UI.bot.max = bot.max_storage;
        UI.bot.currentEnergy = bot.energy;
        UI.bot.chanceToFind = bot.chanceToFind;
        UI.bot.eForNextBot = bot.energyForNextBot;
        UI.bot.status = bot.status;
    }
}*/

/*function bot_production(){
    if(cell.energy >= botFarm.energyForNextBot){
        addNewBot();
        botFarm.CTF += 0.3;
        botFarm.PR *= 2;
        botFarm.MS *= 2.5;
        console.log("welp!");
        botFarm.energyForNextBot *= botFarm.energyForNextBotGrowthRate;
    }
}*/

function bot_gather(object){
    //cell.energy -= 0.5;
    var ran =  randNum(0, object.smartness);
    object.color = "White";
    var ang = return_angle(object.x, object.y, randNum(map_w, -map_w), randNum(map_h, -map_h));
    if(object.type == "resource"){
        var res = resources_[Math.round(randNum(0, 2))];
        if(ran < res.rarity){
            res.amount += 1;
            parts.amount += 1;
        }
    } else if(object.type == "engines"){
        var eng = engines_[Math.round(randNum(0, 2))];
        if(ran < eng.rarity){
            var rand = randNum(0, 50);
            if(rand < 7){
                eng.amount += 1;
                parts.amount += 1;
            }
        }
    } else if(object.type == "forms"){
        var form = forms_[Math.round(randNum(0, 3))];
        if(ran < form.rarity){
            var rand = randNum(0, 50);
            if(rand < 3){
                form.amount += 1;
                parts.amount += 1;
            }
        }
    } /*else if(object.type == "energy"){
        if(ran < object.chanceToFind){
            object.energy += randNum(object.produceRate/3.5, object.produceRate);
        }
    }*/

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

addNewBot_("resource");
//addNewBot("engines");

/*var ang = 0;
window.setInterval(function(){
    bot.vx = Math.cos(randNum(-360, 360)) * bot.speed;
    bot.vy = Math.sin(randNum(-360, 360)) * bot.speed;
}, 1000 * (randNum(1, 7)));*/
