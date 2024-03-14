import { Request, Response } from "express";
import { RequestRegisterVehicleData } from "../types/request-data.types";
import User, { IUser } from "../models/user.model";
import Joi from "joi";




export default class {

    public static registerVehicle = async (req: Request, res: Response): Promise<Response> => {

        const { vehicle, status }: RequestRegisterVehicleData = req.body;
        const data: RequestRegisterVehicleData = { vehicle, status };

        const { error } = Joi.object({
            vehicle: Joi.string().valid('bike', 'car').required(),
            status: Joi.boolean().required()
        }).validate(data);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const user: IUser | null = await this.getRequestUser(req);

        if (user === null) {
            return res.status(401).json({ success: false, message: 'Authentication Failed!' });
        }

        user.vehicle = vehicle;
        user.status = status;
        await user.save();

        return res.json({ success: true, message: 'Vehicle Registered/Updated' });
    }

    public static getRegisteredVehicle = async (req: Request, res: Response): Promise<Response> => {

        const user: IUser | null = await this.getRequestUser(req);

        if (user === null) {
            return res.status(401).json({ success: false, message: 'Authentication Failed!' });
        }


        const vehicle: 'bike' | 'car' | null = user.vehicle || null;
        const status: boolean = user.status || false;


        return res.json({ success: true, vehicle, status });
    }


    private static getRequestUser = async (req: Request): Promise<IUser | null> => {
        //@ts-ignore
        const user_id = req.user._id;
        return await User.findById(user_id);
    }
}