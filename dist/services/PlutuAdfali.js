"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlutuAdfali = void 0;
// src/services/PlutuAdfali.ts
const PlutuService_1 = require("./PlutuService");
const PlutuApiResponse_1 = require("./responses/PlutuApiResponse");
const PlutuAdfaliApiResponse_1 = require("./responses/PlutuAdfaliApiResponse");
class PlutuAdfali extends PlutuService_1.PlutuService {
    constructor() {
        super(...arguments);
        this.gateway = "edfali";
    }
    async verify(mobileNumber, amount) {
        if (!mobileNumber || !amount)
            throw new Error("Invalid parameters");
        const params = { mobile_number: mobileNumber, amount };
        try {
            const responseData = await this.callApi(params, "verify", this.gateway);
            const plutuApiResponse = new PlutuApiResponse_1.PlutuApiResponse(responseData);
            return new PlutuAdfaliApiResponse_1.PlutuAdfaliApiResponse(plutuApiResponse);
        }
        catch (error) {
            throw error;
        }
    }
    async confirm(processId, code, amount, invoiceNo) {
        const params = {
            process_id: processId,
            code,
            amount,
            invoice_no: invoiceNo,
        };
        try {
            const responseData = await this.callApi(params, "confirm", this.gateway);
            const plutuApiResponse = new PlutuApiResponse_1.PlutuApiResponse(responseData);
            return new PlutuAdfaliApiResponse_1.PlutuAdfaliApiResponse(plutuApiResponse);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.PlutuAdfali = PlutuAdfali;
