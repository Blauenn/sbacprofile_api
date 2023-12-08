import { Request, Response } from "express";
// Services //
import {
  clubManager_createMultiple,
  clubManager_createOne,
  clubManager_deleteMultiple,
  clubManager_deleteOne,
  clubManager_getAll,
  clubManager_updateOne,
} from "../../services/clubs/clubManager.service";

// Get all //
export const clubManager_onGetAll = async (response: Response) => {
  try {
    let result = await clubManager_getAll();
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
export const clubManager_onCreate = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body) {
      return response.status(401).send("Bad request");
    }

    let result = await clubManager_createOne(request.body);
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
// Create multiple //
export const clubManager_onCreateMultiple = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body?.club_ID || !request.body?.clubManagers) {
      return response.status(401).send("Bad request");
    }

    let result = await clubManager_createMultiple(
      request.body.club_ID,
      request.body.clubManagers
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

// Update //
export const clubManager_onUpdate = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body?.id || !request.body?.clubManagerInfo) {
      return response.status(401).send("Bad request");
    }

    let result = await clubManager_updateOne(
      request.body.id,
      request.body.clubManagerInfo
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
export const clubManager_onDelete = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body?.id) {
      return response.status(401).send("Bad request");
    }

    let result = await clubManager_deleteOne(request.body.id);
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
// Delete multiple //
export const clubManager_onDeleteMultiple = async (
  request: Request,
  response: Response
) => {
  try {
    if (!request.body?.club_ID || !request.body?.clubManagers) {
      return response.status(401).send("Bad request");
    }

    let result = await clubManager_deleteMultiple(
      request.body.club_ID,
      request.body.clubManagers
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
