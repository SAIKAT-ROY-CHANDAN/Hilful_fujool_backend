import { ZodObject } from "zod";
import catchAsync from "../utils/catchAsync";

const validationRequest = (schema: ZodObject<any>) => {
  return catchAsync(async (req, res, next) => {
    await schema.parseAsync({
      body: req.body,
      file: req.file,
    });

    next();
  });
};

export default validationRequest;
