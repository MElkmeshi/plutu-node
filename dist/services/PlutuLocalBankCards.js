"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlutuLocalBankCards = void 0;
// src/services/PlutuLocalBankCards.ts
const PlutuService_1 = require("./PlutuService");
const PlutuLocalBankCardsApiResponse_1 = require("./responses/PlutuLocalBankCardsApiResponse");
const PlutuApiResponse_1 = require("./responses/PlutuApiResponse");
class PlutuLocalBankCards extends PlutuService_1.PlutuService {
    constructor() {
        super(...arguments);
        this.gateway = "localbankcards";
    }
    /**
     * Confirm a payment with the Plutu LocalBankCards gateway.
     *
     * @param amount - The amount to confirm.
     * @param invoiceNo - The invoice number.
     * @param returnUrl - The return URL after payment.
     * @param lang - The language preference ("en" | "ar").
     * @param customerIp - The customer's IP address (optional).
     * @returns A promise that resolves to a PlutuLocalBankCardsApiResponse instance.
     */
    async confirm(amount, invoiceNo, returnUrl, lang, customerIp) {
        // Validate parameters
        if (!this.validateAmount(amount)) {
            return new PlutuLocalBankCardsApiResponse_1.PlutuLocalBankCardsApiResponse(new PlutuApiResponse_1.PlutuApiResponse({
                success: false,
                status: 400,
                data: {
                    error: {
                        code: "INVALID_AMOUNT",
                        message: "Invalid amount",
                    },
                },
            }));
        }
        if (!this.validateInvoiceNo(invoiceNo)) {
            return new PlutuLocalBankCardsApiResponse_1.PlutuLocalBankCardsApiResponse(new PlutuApiResponse_1.PlutuApiResponse({
                success: false,
                status: 400,
                data: {
                    error: {
                        code: "INVALID_INVOICE_NO",
                        message: "Invalid invoice number",
                    },
                },
            }));
        }
        if (!this.validateReturnUrl(returnUrl)) {
            return new PlutuLocalBankCardsApiResponse_1.PlutuLocalBankCardsApiResponse(new PlutuApiResponse_1.PlutuApiResponse({
                success: false,
                status: 400,
                data: {
                    error: {
                        code: "INVALID_RETURN_URL",
                        message: "Invalid return URL",
                    },
                },
            }));
        }
        const params = {
            amount,
            invoice_no: invoiceNo,
            return_url: returnUrl,
        };
        if (customerIp)
            params.customer_ip = customerIp;
        if (lang)
            params.lang = lang;
        const apiResponse = await this.callApi(params, "confirm", this.gateway);
        return new PlutuLocalBankCardsApiResponse_1.PlutuLocalBankCardsApiResponse(apiResponse);
    }
    /**
     * Handle callback from the Plutu LocalBankCards gateway.
     *
     * @param parameters - The callback parameters.
     * @returns A promise that resolves to the processed parameters.
     */
    async callbackHandler(parameters) {
        const callbackParameters = [
            "gateway",
            "approved",
            "canceled",
            "invoice_no",
            "amount",
            "transaction_id",
        ];
        const data = this.getCallbackParameters(parameters, callbackParameters);
        this.checkValidCallbackHash(parameters, data);
        return parameters; // You can wrap this in a specific callback response class if needed
    }
}
exports.PlutuLocalBankCards = PlutuLocalBankCards;
