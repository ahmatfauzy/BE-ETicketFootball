import express from "express";
import {
  createMatch,
  getAllMatches,
  getMatchById,
  updateMatch,
  deleteMatch,
} from "../controllers/MatchController";

const router = express.Router();

router.post("/", createMatch);
router.get("/", getAllMatches);
router.get("/:id", getMatchById);
router.put("/:id", updateMatch);
router.delete("/:id", deleteMatch);

export default router;
