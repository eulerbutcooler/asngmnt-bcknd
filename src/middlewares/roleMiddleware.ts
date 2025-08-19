import type { Request, Response, NextFunction } from "express";

const checkRole = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole || userRole !== requiredRole) {
      return res
        .status(403)
        .json({ message: "Access forbidden: Insufficient role" });
    }

    next();
  };
};

export default checkRole;
