import { Router } from "express";
import AuthRoutes from "./auth.routes";
import DriverRoutes from "./driver.routes";
import AuthMiddleware from "../middlewares/auth.middleware";
import mapsController from "../controllers/maps.controller";
const router: Router = Router();



router.use('/auth', AuthRoutes);

router.use('/driver', AuthMiddleware.driver, DriverRoutes);


// map -> get address from latitude and longitude
router.post('/map/get-address', mapsController.getAddress);

export default router;