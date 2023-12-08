import { Router } from "express";
// Controllers //
import {
  clubJoinRequest_onCreate,
  clubJoinRequest_onDelete,
  clubJoinRequest_onGetAll,
  clubJoinRequest_onUpdate,
} from "../../../controllers/clubs/clubJoinRequest.controller";

const router = Router();

router.get("/getAll", clubJoinRequest_onGetAll);
router.post("/create", clubJoinRequest_onCreate);
router.post("/update", clubJoinRequest_onUpdate);
router.post("/delete", clubJoinRequest_onDelete);

export default router;
