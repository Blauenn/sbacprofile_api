import { Router } from "express";
// Controllers //
import {
  student_onCreate,
  student_onDelete,
  student_onGetAll,
  student_onUpdate,
} from "../../../controllers/profiles/student.controller";

const router = Router();

router.get("/getAll", student_onGetAll);
router.post("/create", student_onCreate);
router.post("/update", student_onUpdate);
router.post("/delete", student_onDelete);

export default router;
