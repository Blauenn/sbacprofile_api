import { Router } from "express";
// Controllers //
import { onGetOneProfile } from "../../controllers/profile.controller";

const router = Router();

router.get("/getProfile", onGetOneProfile);

export default router;
