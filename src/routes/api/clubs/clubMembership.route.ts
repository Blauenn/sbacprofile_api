import { Router } from "express";
// Controllers //
import {
  clubMembership_onGetAll,
  clubMembership_onCreate,
  clubMembership_onUpdate,
  clubMembership_onDelete,
} from "../../../controllers/clubs/clubMembership.controller";

const router = Router();

router.get("/getAll", clubMembership_onGetAll);
router.post("/create", clubMembership_onCreate);
router.post("/update", clubMembership_onUpdate);
router.post("/delete", clubMembership_onDelete);

export default router;
