import { Router } from "express";
// Controllers //
import {
  clubLeaveRequest_onCreate,
  clubLeaveRequest_onDelete,
  clubLeaveRequest_onGetAll,
  clubLeaveRequest_onUpdate,
} from "../../../controllers/clubs/clubLeaveRequest.controller";

const router = Router();

router.get("/getAll", clubLeaveRequest_onGetAll);
router.post("/create", clubLeaveRequest_onCreate);
router.post("/update", clubLeaveRequest_onUpdate);
router.post("/delete", clubLeaveRequest_onDelete);

export default router;
