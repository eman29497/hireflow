import { Request, Response } from "express";
import prisma from "../config/db";
export const getDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {
    const totalCandidates = await prisma.candidate.count();
    const interviewing = await prisma.candidate.count({
      where: {
        status: "Interviewing",
      },
    });
    const selected = await prisma.candidate.count({
      where: {
        status: "Selected",
      },
    });
    const recentCandidates = await prisma.candidate.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        createdAt: true,
      },
    });
    res.status(200).json({
      success: true,
      stats: {
        totalCandidates,
        interviewing,
        selected,
        recentCandidates,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};