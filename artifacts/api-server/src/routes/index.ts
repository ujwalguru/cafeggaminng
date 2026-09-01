import { Router, type IRouter } from "express";
import healthRouter from "./health";
import liveCafesRouter from "./live-cafes";

const router: IRouter = Router();

router.use(healthRouter);
router.use(liveCafesRouter);

export default router;
