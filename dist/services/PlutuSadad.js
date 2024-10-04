"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlutuSadad = void 0;
// src/services/PlutuSadad.ts
const PlutuService_1 = require("./PlutuService");
const PlutuSadadApiResponse_1 = require("./responses/PlutuSadadApiResponse");
const PlutuApiResponse_1 = require("./responses/PlutuApiResponse");
class PlutuSadad extends PlutuService_1.PlutuService {
    constructor() {
        super(...arguments);
        this.gateway = "sadadapi";
    }
    /**
     * Verify a payment with the Plutu Sadad gateway.
     *
     * @param mobileNumber - The customer's mobile number.
     * @param birthYear - The customer's birth year.
     * @param amount - The amount to verify.
     * @returns A promise that resolves to a PlutuSadadApiResponse instance.
     */
    async verify(mobileNumber, birthYear, amount) {
        // Validate parameters
        if (!this.validateSadadMobileNumber(mobileNumber)) {
            return new PlutuSadadApiResponse_1.PlutuSadadApiResponse(new PlutuApiResponse_1.PlutuApiResponse({
                success: false,
                status: 400,
                data: {
                    error: {
                        code: "INVALID_MOBILE_NUMBER",
                        message: "Invalid mobile number format",
                    },
                },
            }));
        }
        if (!this.validateBirthYear(birthYear)) {
            return new PlutuSadadApiResponse_1.PlutuSadadApiResponse(new PlutuApiResponse_1.PlutuApiResponse({
                success: false,
                status: 400,
                data: {
                    error: {
                        code: "INVALID_BIRTH_YEAR",
                        message: "Invalid birth year",
                    },
                },
            }));
        }
        if (!this.validateAmount(amount)) {
            return new PlutuSadadApiResponse_1.PlutuSadadApiResponse(new PlutuApiResponse_1.PlutuApiResponse({
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
        const params = {
            mobile_number: mobileNumber,
            birth_year: birthYear,
            amount,
        };
        const apiResponse = await this.callApi(params, "verify", this.gateway);
        return new PlutuSadadApiResponse_1.PlutuSadadApiResponse(apiResponse);
    }
    /**
     * Confirm a payment with the Plutu Sadad gateway.
     *
     * @param processId - The process ID returned from the verify step.
     * @param code - The confirmation code.
     * @param amount - The amount to confirm.
     * @param invoiceNo - The invoice number.
     * @returns A promise that resolves to a PlutuSadadApiResponse instance.
     */
    async confirm(processId, code, amount, invoiceNo) {
        // Validate parameters
        if (!this.validateProcessId(processId)) {
            return new PlutuSadadApiResponse_1.PlutuSadadApiResponse(new PlutuApiResponse_1.PlutuApiResponse({
                success: false,
                status: 400,
                data: {
                    error: {
                        code: "INVALID_PROCESS_ID",
                        message: "Invalid process ID",
                    },
                },
            }));
        }
        if (!this.validateSadadCode(code)) {
            return new PlutuSadadApiResponse_1.PlutuSadadApiResponse(new PlutuApiResponse_1.PlutuApiResponse({
                success: false,
                status: 400,
                data: {
                    error: {
                        code: "INVALID_CODE",
                        message: "Invalid confirmation code",
                    },
                },
            }));
        }
        if (!this.validateAmount(amount)) {
            return new PlutuSadadApiResponse_1.PlutuSadadApiResponse(new PlutuApiResponse_1.PlutuApiResponse({
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
            return new PlutuSadadApiResponse_1.PlutuSadadApiResponse(new PlutuApiResponse_1.PlutuApiResponse({
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
        const params = {
            process_id: processId,
            code,
            amount,
            invoice_no: invoiceNo,
        };
        const apiResponse = await this.callApi(params, "confirm", this.gateway);
        return new PlutuSadadApiResponse_1.PlutuSadadApiResponse(apiResponse);
    }
}
exports.PlutuSadad = PlutuSadad;
