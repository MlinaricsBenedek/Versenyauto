import fastify from 'fastify';
import { UserController } from './module/user/user.controller.js';
import { deleteUserRoutes, getAllUserRoutes, getUserRoutes, loginRoutes, registerUserRoutes, updateUserRoutes} from './module/user/user.route.js'
import { AuthController } from './module/user/auth.controller.js';
import { CarController } from './module/cars/car.controller.js';
import { createCarRoutes, deleteCarRoutes, editCarRoutes, getCarRoutes, getCarsRoutes } from './module/cars/car.route.js';
import { createRaceTrackRoutes, deletRaceTrackeRoutes, editRaceTrackRoutes, getRaceTrackesRoutes, getRaceTrackRoutes } from './module/racetrack/racetrack.routes.js';
import { RaceTrackController } from './module/racetrack/racetrack.controller.js';
import {GlobalErrorHandler} from "./error/GlobalErrorHandlers.js";
const server = fastify();

const userController = new UserController();
const authController = new AuthController(); 
const carController = new CarController();
const racetrackController = new RaceTrackController();

registerUserRoutes(server, userController);
loginRoutes(server, authController);
getUserRoutes(server,userController);
getAllUserRoutes(server,userController);
updateUserRoutes(server,userController);
deleteUserRoutes(server,userController);


getCarsRoutes(server,carController);
getCarRoutes(server,carController);
createCarRoutes(server,carController);
editCarRoutes(server,carController);
deleteCarRoutes(server,carController);

getRaceTrackesRoutes(server,racetrackController)
getRaceTrackRoutes(server,racetrackController);
createRaceTrackRoutes(server,racetrackController);
editRaceTrackRoutes(server,racetrackController);
deletRaceTrackeRoutes(server,racetrackController);

server.setErrorHandler(GlobalErrorHandler.ErrorHandler);

async function main() {
  try {
    
    await server.listen({ port: 3006 });
    console.log('Server listening on port 3003');

  } catch (e) {
    console.error('Connection failed', e);
    process.exit(1);
  }
}

main();


