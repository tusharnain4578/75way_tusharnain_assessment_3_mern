import { Request, Response } from "express"
import { RequestRegisterVehicleData } from "../types/request-data.types"
import User, { IUser } from "../models/user.model"
import Joi from "joi"

export default class {
  public static registerVehicle = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { vehicle, status }: RequestRegisterVehicleData = req.body
    const data: RequestRegisterVehicleData = { vehicle, status }

    return res.json({ success: true, message: "Vehicle Registered/Updated" })
  }
}
