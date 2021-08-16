import { Request, Response, NextFunction } from "express";

export function handleError (err: any, req: Request, res: Response, next: NextFunction) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: 'Internal Error' })
}

export function notFound (req: Request, res: Response) {
    res.status(404).json({
        message: 'Not Found. The resource you are looking for does not exist!',
    });
}