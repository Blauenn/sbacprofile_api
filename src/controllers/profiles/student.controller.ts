import { Request, Response } from "express";
// Services //
import {
  student_createOne,
  student_deleteOne,
  student_getAll,
  student_updateOne,
} from "../../services/profiles/student.service";

// Get all //
export const student_onGetAll = async (response: Response) => {
  try {
    let list = await student_getAll();
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

// Create //
export const student_onCreate = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body) {
      return response.status(401).send("Bad request");
    }

    let result = await student_createOne(request.body);
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
export const student_onUpdate = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body?.id || !request.body?.studentInfo) {
      return response.status(401).send("Bad request");
    }

    let result = await student_updateOne(
      request.body.id,
      request.body.studentInfo
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
export const student_onDelete = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body?.id) {
      return response.status(401).send("Bad request");
    }

    let result = await student_deleteOne(request.body.id);
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
