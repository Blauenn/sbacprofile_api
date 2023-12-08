import { Router } from "express";
// Helpers //
import { require_authentication } from "../../helpers/auth.helper";

const router = Router();

import authentication_router from "./authenticate.route";
import image_router from "./image.route";
import uploadFiles_router from "./uploadFiles.route";

import profile_router from "./profile.route";
import student_router from "./profiles/student.route";
import teacher_router from "./profiles/teacher.route";

import major_router from "./major.route";
import classroom_router from "./classroom.route";

import leaveNotice_router from "./leaveNotice.route";

import club_router from "./clubs/club.route";
import clubJoinRequest_router from "./clubs/clubJoinRequest.route";
import clubLeaveRequest_router from "./clubs/clubLeaveRequest.route";
import clubManager_router from "./clubs/clubManager.route";
import clubMembership_router from "./clubs/clubMembership.route";

router.use("/auth", authentication_router);
router.use("/image", require_authentication, image_router);
router.use("/upload", uploadFiles_router);

router.use("/profile", require_authentication, profile_router);
router.use("/student", student_router);
router.use("/teacher", teacher_router);

router.use("/major", major_router);
router.use("/classroom", classroom_router);

router.use("/leaveNotice", leaveNotice_router);

// Clubs //
router.use("/club", club_router);
router.use("/clubJoinRequest", clubJoinRequest_router);
router.use("/clubLeaveRequest", clubLeaveRequest_router);
router.use("/clubManager", clubManager_router);
router.use("/clubMembership", clubMembership_router);

export default router;
