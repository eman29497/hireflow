import express from "express";
import {
  getAssignments,
  getAssignment,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} from "../controllers/assignmentController";
import authMiddleware from "../middleware/authMiddleware";
const router = express.Router();
router.get("/", authMiddleware, getAssignments);
router.get("/:id", authMiddleware, getAssignment);
router.post("/", authMiddleware, createAssignment);
router.put("/:id", authMiddleware, updateAssignment);
router.delete("/:id", authMiddleware, deleteAssignment);
export default router;