

class ErrorHandler extends Error {
    constructor(statusCode, message, apiVersion, data) {
        super();
        this.statusCode = statusCode || null;
        this.message = message || null;
        this.apiVersion = apiVersion || null;
        this.data = apiVersion || null;
    }
};

export default ErrorHandler;