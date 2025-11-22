import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interface/errors';

const handleZodError = (error: ZodError): TGenericErrorResponse => {
  const statusCode = 400;
  const errorSources: TErrorSources = error.issues.map((issue: ZodIssue) => {
    // Get the last path element
    const lastPath = issue.path[issue.path.length - 1];

    return {
      path: typeof lastPath === "symbol" ? lastPath.toString() : lastPath,
      message: issue.message,
    };
  });

  return {
    statusCode,
    message: 'Validation error',
    errorSources,
  };
};

export default handleZodError;
