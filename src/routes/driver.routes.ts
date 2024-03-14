import { Router } from "express";
import driverController from "../controllers/driver.controller";



const router: Router = Router();


router.get('/get-registered-vehicle', driverController.getRegisteredVehicle);

router.post('/register-vehicle', driverController.registerVehicle);


export default router;