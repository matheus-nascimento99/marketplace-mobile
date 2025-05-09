export class AppError extends Error {
  constructor(
    public error: string,
    public message: string,
    public statusCode: number,
  ) {
    super(message)
    this.error = error
    this.statusCode = statusCode
  }
}
