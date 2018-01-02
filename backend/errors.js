class CategoryError extends Error {
  constructor(message, originalError) {
    super(message);
    this.name = this.constructor.name;
    this.notice = message;
    this.status = 500;
    this.cause = originalError;
    Error.captureStackTrace(this, this.constructor);
  }
}

class BrandError extends Error {
  constructor(message, originalError) {
    super(message);
    this.name = this.constructor.name;
    this.notice = message;
    this.status = 500;
    this.cause = originalError;
    Error.captureStackTrace(this, this.constructor);
  }
}

exports.CategoryError = CategoryError;
exports.BrandError = BrandError;
