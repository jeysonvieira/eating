"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetToken = (req) => {
    var AuthHeader = req.headers.authorization;
    if (AuthHeader) {
        const token = AuthHeader.split(" ")[1];
        return token;
    }
    else {
        return false;
    }
};
exports.default = GetToken;
