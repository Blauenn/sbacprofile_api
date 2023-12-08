import { Router } from "express";
// Controllers //
import { image_onGetImage } from "../../controllers/image.controller";

const router = Router();

router.get("/getImage", image_onGetImage);

export default router;
