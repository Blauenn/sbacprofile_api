import { Router } from "express";
// Helpers //
import { require_authentication } from "../../helpers/auth.helper";

import authentication_router from "./authenticate.route";
import image_router from "./image.route";
import profile_router from "./profile";
import example_router from "./example";
import announcement_router from "./announcement";
import student_router from "./student";
import teacher_router from "./teacher";
import classroom_router from "./classroom";
import major_router from "./major";
import uploadFiles_router from "./upload-files";
import forms_router from "./forms";
import club_router from "./club/club";
import clubLeaveRequest_router from "./club/club-leave-request";
import clubJoinRequest_router from "./club/club-join-request";
import clubMembership_router from "./club/club-membership";
import clubManager_router from "./club/club-manager";

const router = Router();

router.use("/auth", authentication_router);
router.use("/image", require_authentication, image_router);
router.use("/profile", require_authentication, profile_router);
router.use("/example", example_router);
router.use("/announcement", announcement_router);
router.use("/student", student_router);
router.use("/teacher", teacher_router);
router.use("/classroom", classroom_router);
router.use("/major", major_router);
router.use("/upload", uploadFiles_router);
router.use("/forms", forms_router);

// Clubs //
router.use("/club", club_router);
router.use("/clubLeaveRequest", clubLeave_requestRouter);
router.use("/clubJoinRequest", clubJoin_requestRouter);
router.use("/clubMembership", clubMembership_router);
router.use("/clubManager", clubManager_router);

export default router;
