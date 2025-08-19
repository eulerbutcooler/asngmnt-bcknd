import { Router } from "express";
import auth from "../middlewares/authMiddleware.js";
import checkRole from "../middlewares/roleMiddleware.js";
import {
  createContent,
  getContents,
  approveContent,
  rejectContent,
  searchContent,
  getStats,
  getRecentActivity,
} from "../controllers/contentController.js";

const router = Router();

router.post("/", auth, checkRole("user"), createContent);

router.get("/", auth, getContents);

router.put("/:id/approve", auth, checkRole("admin"), approveContent);

router.put("/:id/reject", auth, checkRole("admin"), rejectContent);

router.get("/stats", auth, checkRole("admin"), getStats);

router.get("/search", auth, checkRole("admin"), searchContent);

router.get("/recent", auth, checkRole("admin"), getRecentActivity);

export default router;
