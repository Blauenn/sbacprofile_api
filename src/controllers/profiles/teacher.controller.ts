import { Request, Response } from "express";
// Services //
import {
  teacher_createOne,
  teacher_deleteOne,
  teacher_getAll,
  teacher_updateOne,
} from "../../services/profiles/teacher.service";

// Get all //
export const teacher_onGetAll = async (response: Response) => {
  try {
    let list = await teacher_getAll();
    response.send({
      status: true,
      result: list,
    });
  } catch (error) {
    response.send({
      status: true,
      result: error,
    });
  }
};

// Create //
export const teacher_onCreate = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body) {
      return response.status(401).send("Bad request");
    }

    let result = await teacher_createOne(request.body);
    response.send({
      status: true,
      result: result,
    });
  } catch (error) {
    response.send({
      status: false,
      result: error,
    });
  }
};

// Update //
export const teacher_onUpdate = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body?.id || !request.body?.teacherInfo) {
      return response.status(401).send("Bad request");
    }

    let result = await teacher_updateOne(
      request.body.id,
      request.body.teacherInfo
    );
    response.send({
      status: true,
      result: result,
    });
  } catch (error) {
    response.send({
      status: false,
      result: error,
    });
  }
};

// Delete //
export const teacher_onDelete = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body?.id) {
      response.status(401).send("Bad request");
    }

    let result = await teacher_deleteOne(request.body.id);
    response.send({
      status: true,
      result: result,
    });
  } catch (error) {
    response.send({
      status: false,
      result: error,
    });
  }
};
