import { Router } from "express";
import { authHandler } from "@repo/auth/node";

const router = Router();

router.all("/*", authHandler);

export default router;
