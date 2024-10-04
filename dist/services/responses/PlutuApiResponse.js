"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlutuApiResponse = void 0;
// src/services/Responses/PlutuApiResponse.ts
class PlutuApiResponse {
    constructor(apiResponse) {
        this.success = apiResponse.success;
        this.status = apiResponse.status;
        this.data = apiResponse.data;
        this.error = apiResponse.error;
    }
    isSuccessful() {
        return this.success;
    }
    getStatusCode() {
        return this.status;
    }
    getBody() {
        return this.data;
    }
    getResult() {
        var _a;
        return ((_a = this.data) === null || _a === void 0 ? void 0 : _a.result) || {};
    }
    getResultValue(key = null) {
        if (key === null) {
            return this.getResult();
        }
        else {
            return this.getResult()[key] || null;
        }
    }
    hasError() {
        return !this.success;
    }
    getErrorCode() {
        var _a;
        return ((_a = this.error) === null || _a === void 0 ? void 0 : _a.code) || "UNKNOWN_ERROR";
    }
    getErrorMessage() {
        var _a;
        return ((_a = this.error) === null || _a === void 0 ? void 0 : _a.message) || "An unknown error occurred";
    }
    getErrorFields() {
        var _a, _b;
        return ((_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.fields) || null;
    }
}
exports.PlutuApiResponse = PlutuApiResponse;
