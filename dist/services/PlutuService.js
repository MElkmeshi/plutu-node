"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlutuService = void 0;
const HttpClient_1 = require("../http/HttpClient");
const plutu_1 = require("../config/plutu");
const crypto = __importStar(require("crypto"));
const PlutuApiResponse_1 = require("./responses/PlutuApiResponse"); // Import the response class
class PlutuService {
    constructor(httpClient = new HttpClient_1.HttpClient()) {
        this.httpClient = httpClient;
        this.apiKey = plutu_1.config.apiKey;
        this.accessToken = plutu_1.config.accessToken;
        this.secretKey = plutu_1.config.secretKey;
        this.baseUrl = plutu_1.config.baseUrl;
        this.apiVersion = plutu_1.config.apiVersion;
    }
    getApiHeaders() {
        return {
            Accept: "application/json",
            "X-API-KEY": this.apiKey,
            Authorization: `Bearer ${this.accessToken}`,
        };
    }
    getApiUrl(action, gateway) {
        return `${this.baseUrl}/${this.apiVersion}/transaction/${gateway}/${action}`;
    }
    /**
     * Calls the Plutu API and returns a PlutuApiResponse instance.
     *
     * @param params - The request parameters.
     * @param action - The action to perform (e.g., 'verify', 'confirm').
     * @param gateway - The payment gateway identifier (e.g., 'edfali').
     * @returns A promise that resolves to a PlutuApiResponse instance.
     */
    async callApi(params, action, gateway) {
        const url = this.getApiUrl(action, gateway);
        const headers = this.getApiHeaders();
        const apiResponse = await this.httpClient.request(url, "POST", params, headers);
        return new PlutuApiResponse_1.PlutuApiResponse(apiResponse);
    }
    /**
     * Helper to filter and build query string from callback parameters.
     */
    getCallbackParameters(parameters, callbackParameters) {
        return Object.keys(parameters)
            .filter((key) => callbackParameters.includes(key))
            .map((key) => `${key}=${parameters[key]}`)
            .join("&");
    }
    /**
     * Helper to verify callback hash.
     */
    checkValidCallbackHash(parameters, data) {
        const receivedHash = parameters["hashed"];
        const generatedHash = crypto
            .createHmac("sha256", this.secretKey)
            .update(data)
            .digest("hex")
            .toUpperCase();
        if (!receivedHash ||
            !crypto.timingSafeEqual(Buffer.from(receivedHash), Buffer.from(generatedHash))) {
            throw new Error("Invalid callback hash");
        }
    }
    /**
     * Validation Methods
     */
    validateMobileNumber(mobileNumber) {
        const regex = /^09[1-6][0-9]{7}$/;
        return regex.test(mobileNumber);
    }
    validateSadadMobileNumber(mobileNumber) {
        const regex = /^09[13][0-9]{7}$/;
        return regex.test(mobileNumber);
    }
    validateBirthYear(birthYear) {
        const currentYear = new Date().getFullYear();
        return (typeof birthYear === "number" &&
            birthYear >= 1940 &&
            birthYear <= currentYear - 12);
    }
    validateAmount(amount) {
        return typeof amount === "number" && amount > 0;
    }
    validateProcessId(processId) {
        return /^\d+$/.test(processId);
    }
    validateCode(code) {
        return /^\d{4}$/.test(code); // For PlutuAdfali
    }
    validateSadadCode(code) {
        return /^\d{6}$/.test(code); // For PlutuSadad
    }
    validateInvoiceNo(invoiceNo) {
        const regex = /^[A-Za-z0-9.\-_]+$/;
        return regex.test(invoiceNo) && invoiceNo.trim() !== "";
    }
    validateCallbackUrl(url) {
        try {
            new URL(url);
            return true;
        }
        catch {
            return false;
        }
    }
    validateReturnUrl(url) {
        try {
            new URL(url);
            return true;
        }
        catch {
            return false;
        }
    }
}
exports.PlutuService = PlutuService;
