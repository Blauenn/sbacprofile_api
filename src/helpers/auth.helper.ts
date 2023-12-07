import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// Configs //
import { secret_config } from "../configs/app.config";

export const require_authentication = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (!request.headers.authorization)
      return response.status(401).json({
        message: "Unauthorized",
      });

    const token = request.headers.authorization.includes(" ")
      ? request.headers.authorization.split(" ")[1]
      : request.headers.authorization;

    const user: unknown = jwt.verify(token, secret_config);
    if (typeof user !== "object" || user === null) {
      throw new Error("Invalid user object");
    }
    request.user = user as Record<string, unknown>;

    next();
  } catch (error: any) {
    return response.status(400).json({
      message: error.message,
    });
  }
};
