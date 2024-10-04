"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    apiKey: process.env.PLUTU_API_KEY || "",
    accessToken: process.env.PLUTU_ACCESS_TOKEN || "",
    secretKey: process.env.PLUTU_SECRET_KEY || "",
    baseUrl: "https://api.plutus.ly/api",
    apiVersion: "v1",
};
