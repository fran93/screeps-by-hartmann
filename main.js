var roleHarvester = require('role.harvester');
var roleController = require('role.controller');
var roleBuilder = require('role.builder');
const WORKER_MINIONS = [[WORK, WORK, CARRY, MOVE]]

module.exports.loop = function () {

    for(var name in Game.spawns) {
        var spawn = Game.spawns[name];
        if (spawn.memory.count === undefined) {
            spawn.memory.count = 0;
        }
        var name = 'Minion ' + spawn.memory.count;
        if (spawn.spawnCreep(WORKER_MINIONS[0], name, { dryRun: true }) == 0) {
            spawn.spawnCreep(WORKER_MINIONS[0], name, { memory: {role: 'harvester', number: spawn.memory.count} });
            console.log('Spawning harvester: ' + name);
            spawn.memory.count++;
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.memory.role == 'harvester' && Object.keys(Game.creeps).length >= 9) {
            if (creep.memory.number %2 == 0) {
                console.log('Change minion ' + creep.memory.number + ' role to controller');
                creep.memory.role = "controller";
                roleController.run(creep);
            } else {
                console.log('Change minion ' + creep.memory.number + ' role to builder');
                creep.memory.role = "builder";
                roleBuilder.run(creep);
            }
        } else if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        } else if (creep.memory.role == 'controller') {
            roleController.run(creep);
        } else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
