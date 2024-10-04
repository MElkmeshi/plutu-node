"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlutuAdfaliApiResponse = void 0;
class PlutuAdfaliApiResponse {
    constructor(plutuApiResponse) {
        this.plutuApiResponse = plutuApiResponse;
    }
    getOriginalResponse() {
        return this.plutuApiResponse;
    }
    getProcessId() {
        return this.plutuApiResponse.getResultValue("process_id").toString();
    }
    getTransactionId() {
        return this.plutuApiResponse.getResultValue("transaction_id");
    }
}
exports.PlutuAdfaliApiResponse = PlutuAdfaliApiResponse;
