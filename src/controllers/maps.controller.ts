import { Request, Response } from "express";
import { RequestUserGeolocation } from "../types/request-data.types";
import User, { IUser } from "../models/user.model";
import axios from 'axios';
import Joi from "joi";


export default class {

    public static getAddress = async (req: Request, res: Response): Promise<Response> => {
        try {

            const { error } = Joi.object({
                latitude: Joi.number().required(),
                longitude: Joi.number().required()
            }).validate(req.body);

            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const { latitude, longitude }: RequestUserGeolocation = req.body;


            const apiResponse = await axios.get(process.env.GEOCODE_API ?? '', {
                params: {
                    lat: latitude,
                    lon: longitude,
                    api_key: process.env.GEOCODE_API_KEY ?? ''
                }
            });


            return res.json(apiResponse.data);

        } catch (error) {

            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    };


}