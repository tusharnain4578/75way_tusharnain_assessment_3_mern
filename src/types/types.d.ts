import { IUser } from '../models/user.model';

declare namespace Express {
    export interface Request {
        user: IUser;
    }
    export interface Response {
        user: IUser;
    }
}