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
    res.status(500).json({ message: "Server error while creating content." });
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
    res.status(500).json({ message: "Server error while fetching content." });
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
    res.status(500).json({ message: "Server error while approving content." });
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
    res.status(500).json({ message: "Server error while rejecting content." });
  }
};
