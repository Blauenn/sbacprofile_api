import { Router } from "express";
import { major_onGetAll } from "../../controllers/major.controller";

const router = Router();

router.get("/getAll", major_onGetAll);

export default router;
