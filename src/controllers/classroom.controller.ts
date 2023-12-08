import { Request, Response } from "express";
// Services //
import {
  classroom_getAll,
  classroom_getClassroomByLevel,
  classroom_getClassroomByTeacher,
  classroom_updateOne,
  classroom_deleteOne,
} from "../services/classroom.service";

export const classroom_onGetAll = async (response: Response) => {
  try {
    let result = classroom_getAll;
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
// Get classroom by given level //
export const classroom_onGetClassroomByLevel = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body?.level) {
      return response.status(401).send("Bad request");
    }

    let result = await classroom_getClassroomByLevel(request.body.level);
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
// Get classroom by given teacher ID. //
export const classroom_onGetClassroomByTeacher = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body?.teacher_ID) {
      return response.status(401).send("Bad request");
    }

    let result = await classroom_getClassroomByTeacher(request.body.teacher_ID);
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
export const classroom_onUpdate = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body?.id || !request.body?.classroomInfo) {
      return response.status(401).send("Bad request");
    }

    let result = await classroom_updateOne(
      request.body.id,
      request.body.classroomInfo
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
export const classroom_onDelete = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body?.id) {
      return response.status(401).send("Bad request");
    }

    let result = await classroom_deleteOne(request.body.id);
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
