import { Request, Response } from "express";
import prisma from "../config/db";
export const getCandidates = async (req: Request, res: Response) => {
  try {
    const candidates = await prisma.candidate.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json({
      success: true,
      candidates,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const getCandidate = async (req: Request, res: Response) => {
  try {
    const candidate = await prisma.candidate.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }
    res.status(200).json({
      success: true,
      candidate,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const createCandidate = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, status, notes } = req.body;
    const existingCandidate = await prisma.candidate.findUnique({
      where: { email },
    });
    if (existingCandidate) {
      return res.status(400).json({
        success: false,
        message: "Candidate already exists",
      });
    }
    const candidate = await prisma.candidate.create({
      data: {
        name,
        email,
        phone,
        status,
        notes,
      },
    });
    res.status(201).json({
      success: true,
      message: "Candidate created successfully",
      candidate,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const updateCandidate = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existingCandidate = await prisma.candidate.findUnique({
      where: { id },
    });
    if (!existingCandidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }
    const { name, email, phone, status, notes } = req.body;
    const candidate = await prisma.candidate.update({
      where: { id },
      data: {
        name,
        email,
        phone,
        status,
        notes,
      },
    });
    res.status(200).json({
      success: true,
      message: "Candidate updated successfully",
      candidate,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const deleteCandidate = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existingCandidate = await prisma.candidate.findUnique({
      where: { id },
    });
    if (!existingCandidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }
    await prisma.candidate.delete({
      where: { id },
    });
    res.status(200).json({
      success: true,
      message: "Candidate deleted successfully",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};