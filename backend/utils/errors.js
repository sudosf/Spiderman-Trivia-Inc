class BaseError extends Error {
    constructor(name, statusCode, message) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = true; // To differentiate between operational errors and programming errors
    }
}

class NotFoundError extends BaseError {
    constructor(message) {
        super('NotFoundError', 404, message);
    }
}

class ValidationError extends BaseError {
    constructor(message) {
        super('ValidationError', 400, message);
    }
}
class InvalidOperationError extends BaseError {
    constructor(message) {
        super('InvalidOperationError', 409, message);
    }
}
class BadRequestError extends BaseError {
    constructor(message) {
        super('BadRequestError', 400, message);
    }
}
class UnauthorizedError extends BaseError {
    constructor(message) {
        super('UnauthorizedError', 401, message);
    }
}
class ForbiddenError extends BaseError {
    constructor(message) {
        super('ForbiddenError', 403, message);
    }
}

// Export all custom errors
module.exports = {
    NotFoundError,
    ValidationError,
    InvalidOperationError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError
};
