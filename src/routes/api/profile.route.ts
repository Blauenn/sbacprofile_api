import { Router } from "express";
// Controllers //
import { profile_onGetOneProfile } from "../../controllers/profile.controller";

const router = Router();

router.get("/getProfile", profile_onGetOneProfile);

export default router;
