import { Router } from "express";
// Controllers //
import {
  leaveNotice_onCreate,
  leaveNotice_onDelete,
  leaveNotice_onGetAll,
  leaveNotice_onGetOne,
  leaveNotice_onUpdate,
} from "../../controllers/leaveNotice.controller";

const router = Router();

router.get("/getAll", leaveNotice_onGetAll);
router.post("/getOne", leaveNotice_onGetOne);
router.post("/create", leaveNotice_onCreate);
router.post("/update", leaveNotice_onUpdate);
router.post("/delete", leaveNotice_onDelete);

export default router;
