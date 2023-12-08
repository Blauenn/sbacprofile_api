import { Router } from "express";
// Controllers //
import {
  classroom_onGetAll,
  classroom_onGetClassroomByLevel,
  classroom_onGetClassroomByTeacher,
  classroom_onUpdate,
  classroom_onDelete,
} from "../../controllers/classroom.controller";

const router = Router();

router.get("/", classroom_onGetAll);
router.post("/getClassroomByLevel", classroom_onGetClassroomByLevel);
router.post("/getClassroomByTeacher", classroom_onGetClassroomByTeacher);
router.post("/update", classroom_onUpdate);
router.post("/delete", classroom_onDelete);

export default router;
