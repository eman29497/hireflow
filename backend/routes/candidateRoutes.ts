import express from "express";
import {
  getCandidates,
  getCandidate,
  createCandidate,
  updateCandidate,
  deleteCandidate,
} from "../controllers/candidateController";
import authMiddleware from "../middleware/authMiddleware";
const router = express.Router();
router.get("/", authMiddleware, getCandidates);
router.get("/:id", authMiddleware, getCandidate);
router.post("/", authMiddleware, createCandidate);
router.put("/:id", authMiddleware, updateCandidate);
router.delete("/:id", authMiddleware, deleteCandidate);
export default router;