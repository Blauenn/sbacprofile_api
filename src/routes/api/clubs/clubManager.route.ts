import { Router } from "express";
import {
  clubManager_onGetAll,
  clubManager_onCreate,
  clubManager_onCreateMultiple,
  clubManager_onUpdate,
  clubManager_onDelete,
  clubManager_onDeleteMultiple,
} from "../../../controllers/clubs/clubManager.controller";

const router = Router();

router.get("/getAll", clubManager_onGetAll);

router.post("/create", clubManager_onCreate);
router.post("/createMultiple", clubManager_onCreateMultiple);

router.post("/update", clubManager_onUpdate);

router.post("/delete", clubManager_onDelete);
router.post("/deleteMultiple", clubManager_onDeleteMultiple);

export default router;
