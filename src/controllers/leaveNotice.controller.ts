import { Request, Response } from "express";
import {
  leaveNotice_createOne,
  leaveNotice_deleteOne,
  leaveNotice_getAll,
  leaveNotice_getOne,
  leaveNotice_updateOne,
} from "../services/leaveNotice.service";

// Get all //
export const leaveNotice_onGetAll = async (response: Response) => {
  try {
    let list = await leaveNotice_getAll();
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
// Get one //
export const leaveNotice_onGetOne = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body?.id) {
      return response.status(401).send("Bad request");
    }

    let list = await leaveNotice_getOne(request.body.id);
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
export const leaveNotice_onCreate = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body) {
      return response.status(401).send("Bad request");
    }

    let result = await leaveNotice_createOne(request.body);
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
export const leaveNotice_onUpdate = async (
  request: Request,
  response: Response
) => {
  try {
    if (
      !request.body?.id ||
      !request.body?.updateAs ||
      !request.body?.leaveNoticeInfo
    ) {
      return response.status(401).send("Bad request");
    }

    let result = await leaveNotice_updateOne(
      request.body.id,
      request.body.updateAs,
      request.body.leaveNoticeInfo
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
export const leaveNotice_onDelete = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body?.id) {
      return response.status(401).send("Bad request");
    }

    let result = await leaveNotice_deleteOne(request.body.id);
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
