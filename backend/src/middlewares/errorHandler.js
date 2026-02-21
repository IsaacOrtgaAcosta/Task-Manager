const HttpError = require('../utils/httpError');

module.exports = (err, _req, res, _next) => {
    if(err instanceof HttpError) {
        return res.status(err.status).json({
            error: {
                message: err.message,
                code: err.code,
                details: err.details ?? undefined,
            },
        });
    }

    console.error(err);
    return res.status(500).json({
        error: { message: "Internal server error", code: "INTERNAL_SERVER_ERROR"},
    });
};