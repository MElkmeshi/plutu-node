"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlutuSadadApiResponse = void 0;
class PlutuSadadApiResponse {
    constructor(plutuApiResponse) {
        this.plutuApiResponse = plutuApiResponse;
    }
    /**
     * Get the original Plutu API response.
     */
    getOriginalResponse() {
        return this.plutuApiResponse;
    }
    /**
     * Get the Process ID from the response.
     */
    getProcessId() {
        return this.plutuApiResponse.getResultValue("process_id").toString();
    }
    /**
     * Get the Transaction ID from the response.
     */
    getTransactionId() {
        return this.plutuApiResponse.getResultValue("transaction_id");
    }
}
exports.PlutuSadadApiResponse = PlutuSadadApiResponse;
