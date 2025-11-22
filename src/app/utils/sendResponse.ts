import { Response } from 'express';

type TMeta = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
};

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  meta?: TMeta;
  data?: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  return res.status(data.statusCode).json({
    statusCode: data.statusCode,
    success: data.success,
    ...(data.message && { message: data.message }),
    ...(data.meta && { meta: data.meta }),
    ...(data.data && { data: data.data }),
  });
};

export default sendResponse;
