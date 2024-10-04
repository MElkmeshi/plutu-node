"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlutuTlync = void 0;
// src/services/PlutuTlync.ts
const PlutuService_1 = require("./PlutuService");
const PlutuTlyncApiResponse_1 = require("./responses/PlutuTlyncApiResponse");
class PlutuTlync extends PlutuService_1.PlutuService {
    constructor() {
        super(...arguments);
        this.gateway = "tlync";
    }
    /**
     * Confirm a payment with the Plutu Tlync gateway.
     *
     * @param mobileNumber - The customer's mobile number.
     * @param amount - The amount to confirm.
     * @param invoiceNo - The invoice number.
     * @param returnUrl - The return URL.
     * @param callbackUrl - The callback URL.
     * @param lang - The language preference ("en" | "ar").
     * @param customerIp - The customer's IP address (optional).
     * @returns A promise that resolves to a PlutuTlyncApiResponse instance.
     */
    async confirm(mobileNumber, amount, invoiceNo, returnUrl, callbackUrl, lang, customerIp) {
        const params = {
            mobile_number: mobileNumber,
            amount,
            invoice_no: invoiceNo,
            return_url: returnUrl,
            callback_url: callbackUrl,
        };
        if (lang)
            params.lang = lang;
        if (customerIp)
            params.customer_ip = customerIp;
        const apiResponse = await this.callApi(params, "confirm", this.gateway);
        return new PlutuTlyncApiResponse_1.PlutuTlyncApiResponse(apiResponse);
    }
    /**
     * Handle callback from the Plutu Tlync gateway.
     *
     * @param parameters - The callback parameters.
     * @returns A promise that resolves to the processed parameters.
     */
    async callbackHandler(parameters) {
        const callbackParameters = [
            "gateway",
            "approved",
            "amount",
            "invoice_no",
            "canceled",
            "payment_method",
            "transaction_id",
        ];
        const data = this.getCallbackParameters(parameters, callbackParameters);
        this.checkValidCallbackHash(parameters, data);
        return parameters; // You can wrap this in a specific callback response class if needed
    }
}
exports.PlutuTlync = PlutuTlync;
