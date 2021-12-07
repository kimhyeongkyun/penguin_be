// src/middleware/not-found.middleware.ts

import { NextFunction, Request, response, Response } from "express";

export const notFoundHandler = (request: Request, response:Response, next:NextFunction) => {
    const message = "Resource not found";
    response.status(404).send(message);
}