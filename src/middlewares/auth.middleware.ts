import { NextFunction, Request, Response } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/user.model";

class AuthMiddleware {

    static CUSTOMER_ROLE: 1 | 2 = 1;
    static DRIVER_ROLE: 1 | 2 = 2;

    private static authenticateUser = async (role: 1 | 2, req: Request): Promise<true | false | undefined> => {
        try {
            const token = req.cookies.jwt_token ?? '';


            function isJwtPayload(tokenData: string | JwtPayload): tokenData is JwtPayload {
                return typeof tokenData !== 'string';
            }


            const tokenData: string | JwtPayload = await Jwt.verify(token, process.env.JWT_SECRET || 'jwtsecret@123');

            if (isJwtPayload(tokenData)) {

                const { email } = tokenData;


                const user: IUser | null = await User.findOne({ email });

                if ((user === null) || (user.role != role))
                    return false; // Authentication Failed

                // @ts-ignore
                req.user = user;

                return true; // Authenticated Successfully

            } else {

                return false; // Authentication Failed
            }
        } catch (error) {

            return false; // Authentication Failed
        }
    }

    public static driver = async (req: Request, res: Response, next: NextFunction) => {

        if (!await AuthMiddleware.authenticateUser(this.DRIVER_ROLE, req)) {
            return this.authFailed(res);
        }
        next();
    }


    public static customer = async (req: Request, res: Response, next: NextFunction) => {

        if (!await AuthMiddleware.authenticateUser(this.CUSTOMER_ROLE, req)) {
            return this.authFailed(res);
        }
        next();
    }


    // Helper
    private static authFailed = (res: Response) => {
        return res.status(401).json({ success: false, message: "Authentication Failed!" });
    }
}

export default AuthMiddleware;
