import { Request, Response } from "express";
import {
  club_createOne,
  club_deleteOne,
  club_getAll,
  club_updateOne,
} from "../../services/clubs/club.service";

// Get all //
export const club_onGetAll = async (response: Response) => {
  try {
    let result = await club_getAll();
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
export const club_onCreate = async (request: Request, response: Response) => {
  try {
    if (!request.body) {
      return response.status(401).send("Bad request");
    }

    let result = await club_createOne(request.body);
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
export const club_onUpdate = async (request: Request, response: Response) => {
  try {
    if (!request.body?.id || !request.body?.clubInfo) {
      return response.status(401).send("Bad request");
    }

    let result = await club_updateOne(request.body.id, request.body.clubInfo);
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
export const club_onDelete = async (request: Request, response: Response) => {
  try {
    if (!request.body?.id) {
      return response.status(401).send("Bad request");
    }

    let result = await club_deleteOne(request.body.id);
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
