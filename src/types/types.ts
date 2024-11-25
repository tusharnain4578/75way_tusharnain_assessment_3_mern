import { IUserDocument } from "./../models/user.model"
import { Request } from "express"

type RequestWithUser = Request & { user: IUserDocument }

export default function assertRequestHasUser(
  req: Request
): asserts req is RequestWithUser {
  if (!("user" in req)) {
    throw new Error("Request object without user found unexpectedly")
  }
}
