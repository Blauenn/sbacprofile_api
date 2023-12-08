import { Response } from "express";
// Services //
import { major_getAll } from "../services/major.service";

export const major_onGetAll = async (response: Response) => {
  try {
    let list = await major_getAll();

    response.send({
      status: true,
      result: list,
    });
  } catch (error) {
    response.send({
      status: false,
      result: error,
    });
  }
};
