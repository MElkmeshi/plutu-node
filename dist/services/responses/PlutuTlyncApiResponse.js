"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlutuTlyncApiResponse = void 0;
class PlutuTlyncApiResponse {
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
     * Get the Redirect URL from the response.
     */
    getRedirectUrl() {
        return this.plutuApiResponse.getResultValue("redirect_url");
    }
    /**
     * Get the Transaction ID from the response.
     */
    getTransactionId() {
        return this.plutuApiResponse.getResultValue("transaction_id");
    }
}
exports.PlutuTlyncApiResponse = PlutuTlyncApiResponse;
