import { Router } from "express";
// Controllers //
import {
  teacher_onCreate,
  teacher_onDelete,
  teacher_onGetAll,
  teacher_onUpdate,
} from "../../../controllers/profiles/teacher.controller";

const router = Router();

router.get("/getAll", teacher_onGetAll);
router.post("/create", teacher_onCreate);
router.post("/update", teacher_onUpdate);
router.post("/delete", teacher_onDelete);

export default router;
