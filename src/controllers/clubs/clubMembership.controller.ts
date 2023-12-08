import { Request, Response } from "express";
// Services //
import {
  clubMembership_createOne,
  clubMembership_deleteOne,
  clubMembership_getAll,
  clubMembership_updateOne,
} from "../../services/clubs/clubMembership.service";

// Get all //
export const clubMembership_onGetAll = async (response: Response) => {
  try {
    let result = await clubMembership_getAll();
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
export const clubMembership_onCreate = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body) {
      return response.status(401).send("Bad request");
    }

    let result = await clubMembership_createOne(request.body);
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
export const clubMembership_onUpdate = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body?.id || !request.body?.clubMembershipInfo) {
      return response.status(401).send("Bad request");
    }

    let result = await clubMembership_updateOne(
      request.body.id,
      request.body.clubMembershipInfo
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
export const clubMembership_onDelete = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body) {
      return response.status(401).send("Bad request");
    }

    let result = await clubMembership_deleteOne(request.body);
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
