import { Router } from "express";
import { require_authentication } from "../../helpers/auth.helper";
import {
  onChangePassword,
  onLogin,
} from "../../controllers/authenticate.controller";

const router = Router();

router.post("/login", onLogin);
router.post("/changePassword", require_authentication, onChangePassword);

export default router;
