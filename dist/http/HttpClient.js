"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
// src/http/HttpClient.ts
const axios_1 = __importDefault(require("axios"));
class HttpClient {
    async request(url, method, params = {}, headers = {}) {
        var _a;
        try {
            const response = await (0, axios_1.default)({
                method,
                url,
                headers,
                data: params,
                timeout: 60000,
            });
            return {
                success: true,
                status: response.status,
                data: response.data,
            };
        }
        catch (error) {
            if (error.response) {
                // API responded with a status outside the 2xx range
                const apiError = ((_a = error.response.data) === null || _a === void 0 ? void 0 : _a.error) || {};
                return {
                    success: false,
                    status: error.response.status,
                    data: error.response.data,
                    error: {
                        code: apiError.code || "UNKNOWN_ERROR",
                        message: apiError.message || "An unknown error occurred",
                    },
                };
            }
            else if (error.request) {
                // No response received from the server
                return {
                    success: false,
                    status: 500,
                    data: null,
                    error: {
                        code: "NO_RESPONSE",
                        message: "No response received from the server",
                    },
                };
            }
            else {
                // Error setting up the request
                return {
                    success: false,
                    status: 500,
                    data: null,
                    error: {
                        code: "REQUEST_SETUP_ERROR",
                        message: error.message || "Error setting up the request",
                    },
                };
            }
        }
    }
}
exports.HttpClient = HttpClient;
