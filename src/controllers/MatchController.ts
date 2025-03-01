import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

// Crud
export const createMatch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { homeTeam, awayTeam, matchDate, stadium } = req.body;

    const newMatch = await prisma.match.create({
      data: { homeTeam, awayTeam, matchDate: new Date(matchDate), stadium },
    });

    res.status(201).json({
      message: "Pertandingan berhasil ditambahkan",
      data: newMatch,
    });
  } catch (error) {
    res.status(500).json({ error: "Gagal menambahkan pertandingan" });
  }
};

// Get all
export const getAllMatches = async (req: Request, res: Response): Promise<void> => {
  try {
    const matches = await prisma.match.findMany();

    res.status(200).json({ data: matches });
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data pertandingan" });
  }
};

// Grt by ID
export const getMatchById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const match = await prisma.match.findUnique({
      where: { id },
    });

    if (!match) {
      res.status(404).json({ error: "Pertandingan tidak ditemukan" });
      return;
    }

    res.status(200).json({ data: match });
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data pertandingan" });
  }
};

// Update
export const updateMatch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { homeTeam, awayTeam, matchDate, stadium } = req.body;

    const updatedMatch = await prisma.match.update({
      where: { id },
      data: { homeTeam, awayTeam, matchDate: new Date(matchDate), stadium },
    });

    res.status(200).json({
      message: "Pertandingan berhasil diperbarui",
      data: updatedMatch,
    });
  } catch (error) {
    res.status(500).json({ error: "Gagal memperbarui pertandingan" });
    console.log(error)
  }
};

// Delete
export const deleteMatch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.match.delete({ where: { id } });

    res.status(200).json({ message: "Pertandingan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus pertandingan" });
  }
};
