import { Router } from "express";
// Controllers //
import {
  club_onCreate,
  club_onDelete,
  club_onGetAll,
  club_onUpdate,
} from "../../../controllers/clubs/club.controller";

const router = Router();

router.get("/getAll", club_onGetAll);
router.post("/create", club_onCreate);
router.post("/update", club_onUpdate);
router.post("/delete", club_onDelete);

export default router;
