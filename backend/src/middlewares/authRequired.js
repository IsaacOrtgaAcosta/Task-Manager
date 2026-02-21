const jwt = require('jsonwebtoken');
const { env } = require("../utils/env");
const HttpError = require("../utils/httpError");

function authRequired(req, _res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return next(new HttpError(401, "Authorization header missing"));
    }

    const [scheme, token] = authHeader.split(" ");

    if(scheme !== "Bearer" || !token){
        return next(new HttpError(401, "Invalid authorization format"));
    }

    try{
        const payload = jwt.verify(token, env.JWT_SECRET);
        const userId = payload.sub;
        if(!userId){
            return next(new HttpError(401, "Invalid token payload"));
        }

        req.user = { id: userId };
        return next();

    }catch (err){
        return next(new HttpError(401, "Invalid or expired token"));
    }
}

module.exports = authRequired;