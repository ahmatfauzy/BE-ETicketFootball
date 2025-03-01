import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create
export const createTicket = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { matchId, userId, seatNumber, price } = req.body;

    const newTicket = await prisma.ticket.create({
      data: {
        matchId,
        userId,
        seatNumber,
        price,
      },
    });

    res.status(201).json({
      message: "Tiket berhasil dibuat",
      data: newTicket,
    });
  } catch (error) {
    res.status(500).json({ error: "Gagal membuat tiket" });
  }
};

// Get all
export const getAllTickets = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tickets = await prisma.ticket.findMany({
      include: { match: true, user: true },
    });

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data tiket" });
  }
};

// Get by ID
export const getTicketById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const ticket = await prisma.ticket.findUnique({
      where: { id },
      include: { match: true, user: true },
    });

    if (!ticket) {
      res.status(404).json({ error: "Tiket tidak ditemukan" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil tiket" });
  }
};

// Update
export const updateTicket = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { matchId, userId, seatNumber, price } = req.body;

    const existingTicket = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!existingTicket) {
      res.status(404).json({ error: "Tiket tidak ditemukan" });
    }

    const updatedTicket = await prisma.ticket.update({
      where: { id },
      data: {
        matchId,
        userId,
        seatNumber,
        price,
        updatedAt: new Date(),
      },
    });

    res.status(200).json({
      message: "Tiket berhasil diperbarui",
      data: updatedTicket,
    });
  } catch (error) {
    res.status(500).json({ error: "Gagal memperbarui tiket" });
  }
};

// Delete
export const deleteTicket = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.ticket.delete({ where: { id } });

    res.status(200).json({ message: "Tiket berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus tiket" });
  }
};
