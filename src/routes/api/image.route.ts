import { Router } from "express";
// Controllers //
import { onGetImage } from "../../controllers/image.controller";

const router = Router();

router.get("/getImage", onGetImage);

export default router;
