import { Request, Response } from "express";
import { RequestUserSignupData, RequestUserLoginData } from "../types/request-data.types";
import Joi from "joi";
import User, { IUser } from "../models/user.model";



export default class {

    public static signup = async (req: Request, res: Response): Promise<Response> => {

        const { fullName, email, phone, role, password, confirmPassword }: RequestUserSignupData = req.body;
        const data: RequestUserSignupData = { fullName, email, phone, role, password, confirmPassword };


        const { error } = Joi.object({
            fullName: Joi.string().required().max(200),
            email: Joi.string().required().max(250).email(),
            phone: Joi.string().required().length(10).pattern(/^[0-9]+$/).required(),
            role: Joi.number().valid(1, 2).required(),
            password: Joi.string().required().min(8),
            confirmPassword: Joi.string().required().equal(Joi.ref('password'))
        }).validate(data);


        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Checking if email already exists

        if (await User.findOne({ email })) {
            return res.status(400).json({ success: false, message: "Email already registered!" });
        }

        // Checking if phone number already exists
        if (await User.findOne({ phone })) {
            return res.status(400).json({ success: false, message: "Phone Number already registered!" });
        }

        // Creating new user
        const user: IUser = new User(data);
        await user.save();

        return res.json({ success: true, message: "user Registration Complete!" });
    }



    public static login = async (req: Request, res: Response): Promise<Response> => {

        const { email, password }: RequestUserLoginData = req.body;
        const data: RequestUserLoginData = { email, password };


        const { error } = Joi.object({
            email: Joi.string().required().max(250).email(),
            password: Joi.string().required(),
        }).validate(data);

        if (error)
            return res.status(400).json({ message: error.details[0].message });


        const user: IUser | null = await User.findOne({ email });

        if (user === null)
            return res.status(400).json({ success: false, message: "user(Email) not registered!" });


        const isPasswordValid: boolean = await user.isPasswordValid(password);

        if (!isPasswordValid)
            return res.status(400).json({ success: false, message: "Wrong Password!" });

        // generating jwt token
        const token = await user.generateJwt();

        res.cookie("jwt_token", token);

        const _user = {
            userId: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role
        };

        return res.json({ success: true, message: "Login Success!", user: _user, token: token });
    }


}