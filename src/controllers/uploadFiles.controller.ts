import { Request, Response } from "express";
// Services //
import { uploadFiles_uploadFile } from "../services/uploadFiles.service";

const handleUpload = async (
  request: Request,
  response: Response,
  pathPrefix: string
) => {
  try {
    if (!request.files || !request.files["file"] || !request.body.filename) {
      return response.status(401).send("Bad request");
    }

    const files = request.files["file"];
    const uploadedFile = Array.isArray(files) ? files[0] : files;

    if (!uploadedFile || !uploadedFile.data) {
      return response.status(401).send("Bad request");
    }

    const path = `${pathPrefix}${request.body.filename}`;
    const data = uploadedFile;
    let result = await uploadFiles_uploadFile(path, data);
    response.send({
      status: true,
      result,
    });
  } catch (error) {
    response.send({
      status: false,
      result: error,
    });
  }
};

export const uploadFiles_onUpload_StudentImage = async (
  request: Request,
  response: Response
) => {
  await handleUpload(request, response, "/assets/profilePic/students/");
};

export const uploadFiles_onUpload_TeacherImage = async (
  request: Request,
  response: Response
) => {
  await handleUpload(request, response, "/assets/profilePic/teachers/");
};

export const uploadFiles_onUpload_ClubImage = async (
  request: Request,
  response: Response
) => {
  await handleUpload(request, response, "/assets/profilePic/clubs/");
};

export const uploadFiles_onUpload_LeaveNoticeFile = async (
  request: Request,
  response: Response
) => {
  await handleUpload(request, response, "/assets/files/leaveNotices/");
};
