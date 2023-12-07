import { Request, Response } from "express";
// Services //
import { login, change_password } from "../services/authenticate.service";

export const onLogin = async (request: Request, response: Response) => {
  try {
    if (!request.body?.email || !request.body?.password) {
      response.status(401).send("Bad request");
      return;
    }

    let token = await login(request.body.email, request.body.password);
    response.send({
      status: true,
      result: {
        accessToken: token,
      },
    });
  } catch (error) {
    response.send({
      status: false,
      result: error,
    });
  }
};

export const onChangePassword = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body?.password) {
      return response.status(401).send("Bad request");
    }

    if (!request.user?.user_role || !request.user?.user_role_ID) {
      return response.send({
        status: false,
        result: "The request headers don't contain authorization!",
      });
    }

    let result = await change_password(
      request.user.user_role_ID as number,
      request.body.password as string
    );
    response.send({
      status: true,
      result,
    });
  } catch (error) {
    response.send({
      status: false,
      result: error,
    });
  }
};
