class CategoryError extends Error {
  constructor(message, originalError) {
    super();
    this.name = this.constructor.name;
    this.message = message;
    this.status = 500;
    this.cause = originalError;
    Error.captureStackTrace(this, this.constructor);
  }
}

class BrandError extends Error {
  constructor(message, originalError) {
    super();
    this.name = this.constructor.name;
    this.message = message;
    this.status = 500;
    this.cause = originalError;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ProductError extends Error {
  constructor(message, originalError) {
    super();
    this.name = this.constructor.name;
    this.message = message;
    this.status = 500;
    this.cause = originalError;
    Error.captureStackTrace(this, this.constructor);
  }
}

exports.CategoryError = CategoryError;
exports.BrandError = BrandError;
exports.ProductError = ProductError;
