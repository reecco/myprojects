import { Express, NextFunction, Request, Response } from "express";
import cors from 'cors';

function access(app: Express) {
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", 'GET');
    cors();
    next();
  });
}

export default access;