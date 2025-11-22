import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import AppError from "../errors/AppError";
import handleZodError from "../errors/handleZodError";
import { handlePrismaError } from "../errors/handlePrismaError";
import { TErrorSources } from "../interface/errors";

export const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorSources: TErrorSources = [{ path: "", message: "Something went wrong" }];

  if (error instanceof ZodError) {
    const e = handleZodError(error);
    statusCode = e.statusCode;
    message = e.message;
    errorSources = e.errorSources;
  } 
  
  else if (error.code && typeof error.code === "string" && error.code.startsWith("P2")) {
    const e = handlePrismaError(error);
    statusCode = e.statusCode;
    message = e.message;
    errorSources = e.errorSources;
  } 
  
  else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errorSources = [{ path: "", message: error.message }];
  } 
  
  else if (error instanceof Error) {
    message = error.message;
    errorSources = [{ path: "", message: error.message }];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: error.stack ?? null,
  });
};
