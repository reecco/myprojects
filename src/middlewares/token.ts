import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv';

dotenv.config();

export default (req: Request, res: Response, next: NextFunction) => {
  const token = process.env.TOKEN;

  if (!req.body.token)
    return res.status(401).json({ message: 'Invalid token.' });

  if (req.body.token !== token)
    return res.status(401).json({ message: 'Invalid token.' });

  next();
}