import express from "express";
import { createTicket, getAllTickets, getTicketById, updateTicket, deleteTicket } from "../controllers/TicketController";

const router = express.Router();

router.post("/", createTicket);
router.get("/", getAllTickets);
router.get("/:id", getTicketById);
router.put("/:id", updateTicket);
router.delete("/:id", deleteTicket);

export default router;
