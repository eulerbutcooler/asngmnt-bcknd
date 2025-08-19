import type { Request, Response } from "express";
import Content from "../models/Content.js";

export const createContent = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  try {
    const newContent = new Content({
      title,
      description,
      createdBy: req.user?.id,
    });
    const content = await newContent.save();
    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ message: "Error while creating content." });
  }
};

export const getContents = async (req: Request, res: Response) => {
  try {
    const role = req.user?.role;
    let contents;

    if (role === "admin") {
      contents = await Content.find().populate("createdBy", "email");
    } else {
      contents = await Content.find({ createdBy: req.user?.id });
    }
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: "Error while fetching content." });
  }
};

export const approveContent = async (req: Request, res: Response) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    if (!content) {
      return res.status(404).json({ message: "Content not found." });
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: "Error while approving content." });
  }
};

export const rejectContent = async (req: Request, res: Response) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    if (!content) {
      return res.status(404).json({ message: "Content not found." });
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: "Error while rejecting content." });
  }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    const approvedCount = await Content.countDocuments({ status: "approved" });
    const pendingCount = await Content.countDocuments({ status: "pending" });
    const rejectedCount = await Content.countDocuments({ status: "rejected" });
    const totalCount = approvedCount + pendingCount + rejectedCount;

    res.json({
      approved: approvedCount,
      pending: pendingCount,
      rejected: rejectedCount,
      total: totalCount,
    });
  } catch {
    res.status(500).json({ message: "Error fetching analytics" });
  }
};

export const searchContent = async (req: Request, res: Response) => {
  try {
    const { keyword, status } = req.body();
    let query: any = {};

    if (status) {
      query.status = status;
    }

    if (keyword) {
      query.$text = { $search: keyword as string };
    }

    const contents = await Content.find(query).populate("createdBy", "email");
    res.json(contents);
  } catch {
    res.status(500).json({ message: "Error searching content" });
  }
};

export const getRecentActivity = async (req: Request, res: Response) => {
  try {
    const recentActivity = await Content.find({
      status: { $in: ["approved", "rejected"] },
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("createdBy", "email");
    res.json(recentActivity);
  } catch {
    res.status(500).json({ message: "Error fetching recent activity" });
  }
};
