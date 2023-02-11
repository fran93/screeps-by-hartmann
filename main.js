var roleHarvester = require('role.harvester');
var roleController = require('role.controller')
var roleBuilder = require('role.builder')

module.exports.loop = function () {

    for(var name in Game.spawns) {
        var spawn = Game.spawns[name];
        var name = 'Minion_' + Object.keys(Game.creeps).length;
        if (spawn.spawnCreep([WORK, CARRY, MOVE], name, { dryRun: true }) == 0) {
            if (Object.keys(Game.creeps).length % 3 == 0) {
                spawn.spawnCreep([WORK, CARRY, MOVE], name, { memory: {role: 'harvester'} });
                console.log('Spawning harvester: ' + name);
            } else if (Object.keys(Game.creeps).length % 3 == 1) {
                spawn.spawnCreep([WORK, CARRY, MOVE], name, { memory: {role: 'controller'} });
                console.log('Spawning controller: ' + name);
            } else {
                spawn.spawnCreep([WORK, CARRY, MOVE], name, { memory: {role: 'builder'} });
                console.log('Spawning builder: ' + name);
            }
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        } else if (creep.memory.role == 'controller') {
            roleController.run(creep);
        } else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
