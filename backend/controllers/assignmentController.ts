import { Request, Response } from "express";
import prisma from "../config/db";
export const getAssignments = async (req: Request, res: Response) => {
  try {
    const assignments = await prisma.assignment.findMany({
      include: {
        candidate: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json({
      success: true,
      assignments,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const getAssignment = async (req: Request, res: Response) => {
  try {
    const assignment = await prisma.assignment.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        candidate: true,
        user: true,
      },
    });
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }
    res.status(200).json({
      success: true,
      assignment,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const createAssignment = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      status,
      dueDate,
      candidateId,
      userId,
    } = req.body;
    const assignment = await prisma.assignment.create({
      data: {
        title,
        description,
        status,
        dueDate: new Date(dueDate),
        candidateId,
        userId,
      },
    });
    res.status(201).json({
      success: true,
      message: "Assignment created successfully",
      assignment,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const updateAssignment = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existingAssignment = await prisma.assignment.findUnique({
      where: { id },
    });
    if (!existingAssignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }
    const {
      title,
      description,
      status,
      dueDate,
      candidateId,
      userId,
    } = req.body;
    const assignment = await prisma.assignment.update({
      where: { id },
      data: {
        title,
        description,
        status,
        dueDate: new Date(dueDate),
        candidateId,
        userId,
      },
    });
    res.status(200).json({
      success: true,
      message: "Assignment updated successfully",
      assignment,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const deleteAssignment = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existingAssignment = await prisma.assignment.findUnique({
      where: { id },
    });
    if (!existingAssignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }
    await prisma.assignment.delete({
      where: { id },
    });
    res.status(200).json({
      success: true,
      message: "Assignment deleted successfully",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};