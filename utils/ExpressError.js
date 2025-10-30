class ExpressError extends Error {
    constructor(message, statusCode) {
        super(message); // This is the correct way
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;

