import {Router} from 'express';
const router = new Router();
import ActionService from "../controller/actions.controller.js";

router.get("/actions", ActionService.getActionsProduct)

export default router;