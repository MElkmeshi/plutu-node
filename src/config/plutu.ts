import dotenv from "dotenv";
dotenv.config();
export const config = {
  apiKey: process.env.PLUTU_API_KEY || "",
  accessToken: process.env.PLUTU_ACCESS_TOKEN || "",
  secretKey: process.env.PLUTU_SECRET_KEY || "",
  baseUrl: "https://api.plutus.ly/api",
  apiVersion: "v1",
};
