
import * as dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import randToken from "rand-token";
import { User } from "../interfaces/users/user.interfaces";

const SECRET_KEY = "secret_key";

const options: object = {
    algorithm: "HS256",
    expiresIn : "10m",
    issuer : "issuer"
};

dotenv.config();

export const checkJwt = async(req:Request, res:Response, next:NextFunction) => {
    var token:any = req.headers.token;
    console.log(token)
    if(!token)
        return res.status(400).send("token error");
    const user = await verifyToken(token);
    console.log(user);
    next();
}

export const signToken = async(user:User) => {
    const payload = {
        idx : user.name
    }
    const result:object = {
        token : jwt.sign(payload, SECRET_KEY, options),
        refeshToken : randToken.uid(256)
    }
    return result;
}


export const verifyToken = async(token:string) => {
    let decoded;

    try {
        decoded = jwt.verify(token, SECRET_KEY);
    } catch (error) {
        
    }
    return decoded;
}


// secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
// }),

// audience: process.env.AUTH0_AUDIENCE,
// issuer: `https://${process.env.AUTH0_DOMAIN}/`,
// algorithms: ["RS256"]