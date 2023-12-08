import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
// Services //
import { getImage } from "../services/image.service";

export const image_onGetImage = async (
  request: Request,
  response: Response
) => {
  if (!request.user?.user_role || !request.user?.user_role_ID) {
    return response.send({
      status: false,
      result: "The request headers don't contain authorization!",
    });
  }

  const result = await getImage(
    request.user.user_role as number,
    request.user.user_role_ID as number
  );

  const rows = result as RowDataPacket[];

  if (request.user.user_role == 1) {
    response.send({
      status: true,
      result: {
        profile_image: rows[0]["student_image"],
      },
    });
  } else {
    response.send({
      status: true,
      result: {
        profile_image: rows[0]["teacher_image"],
      },
    });
  }
};
