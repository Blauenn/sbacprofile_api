import { Router } from "express";
// Controllers //
import {
  uploadFiles_onUpload_ClubImage,
  uploadFiles_onUpload_LeaveNoticeFile,
  uploadFiles_onUpload_StudentImage,
  uploadFiles_onUpload_TeacherImage,
} from "../../controllers/uploadFiles.controller";

const router = Router();

router.post("/image/student", uploadFiles_onUpload_StudentImage);
router.post("/image/teacher", uploadFiles_onUpload_TeacherImage);
router.post("/image/club", uploadFiles_onUpload_ClubImage);

router.post("/file/leaveNotice", uploadFiles_onUpload_LeaveNoticeFile);

export default router;
