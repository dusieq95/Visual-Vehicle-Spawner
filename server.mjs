/* Visual Vehicle Spawner (1.0)
 * _dusieq#0404 (Discord), Enerv#6489 (Discord)
 * GPLv2 / MIT License
 */

import * as alt from 'alt';

//default = 1
const limit = 1;

alt.onClient('playerSpawnVehicle', (player, model) => {
    if (player.vehicles.length >= limit) {
        player.vehicles[0].destroy();
        player.vehicles.splice(0, 1);
    }

    const vehicle = new alt.Vehicle(model, player.pos.x, player.pos.y, player.pos.z, 0, 0, 0);
    player.vehicles.push(vehicle);

    alt.emitClient(player, 'setPedIntoVehicle', vehicle);
});

alt.on('playerConnect', (player) => {
    player.vehicles = [];
});

alt.on('playerDisconnect', (player) => {
    const vehicles = player.vehicles;

    vehicles.forEach(vehicle => {
        vehicle.destroy();
    });
});

console.log('[VVS] Server-Side Loaded.');