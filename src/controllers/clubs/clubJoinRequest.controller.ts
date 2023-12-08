import { Request, Response } from "express";
// Services //
import {
  clubJoinRequest_createOne,
  clubJoinRequest_deleteOne,
  clubJoinRequest_getAll,
  clubJoinRequest_updateOne,
} from "../../services/clubs/clubJoinRequest.service";

// Get all //
export const clubJoinRequest_onGetAll = async (response: Response) => {
  try {
    let result = await clubJoinRequest_getAll();
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

// Create //
export const clubJoinRequest_onCreate = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body) {
      return response.status(401).send("Bad request");
    }

    let result = await clubJoinRequest_createOne(request.body);
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
export const clubJoinRequest_onUpdate = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body) {
      return response.status(401).send("Bad request");
    }

    let result = await clubJoinRequest_updateOne(
      request.body.id,
      request.body.clubJoinRequestInfo
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
export const clubJoinRequest_onDelete = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body?.id) {
      return response.status(401).send("Bad request");
    }

    let result = await clubJoinRequest_deleteOne(request.body.id);
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
