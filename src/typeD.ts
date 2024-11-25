import { IUserDocument } from "./models/user.model"
console.log("heldamano")

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument
    }
  }
}
