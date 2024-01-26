class AppError extends Error {
  constructor(name, httpStatusCode, description) {
    super(name, httpStatusCode, description);
    Error.captureStackTrace(this);
  }
}

export default AppError;
