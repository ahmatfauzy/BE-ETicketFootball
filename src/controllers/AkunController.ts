import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Register
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const existingUser = await prisma.akun.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: "Email already registered" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.akun.create({
      data: { email, password: hashedPassword },
    });

    res.status(201).json({ message: "Success", data: { id: newUser.id, email: newUser.email } });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Failed to register akun" });
  }
};

// Login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await prisma.akun.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({ error: "Invalid email or password" });
      return;
    }

    res.status(200).json({ message: "Login successful", data: { id: user.id, email: user.email } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Failed to login" });
  }
};
