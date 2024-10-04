// src/services/PlutuSadad.ts
import { PlutuService } from "./PlutuService";
import { PlutuSadadApiResponse } from "./responses/PlutuSadadApiResponse";
import { PlutuApiResponse } from "./responses/PlutuApiResponse";

export class PlutuSadad extends PlutuService {
  private gateway: string = "sadadapi";

  /**
   * Verify a payment with the Plutu Sadad gateway.
   *
   * @param mobileNumber - The customer's mobile number.
   * @param birthYear - The customer's birth year.
   * @param amount - The amount to verify.
   * @returns A promise that resolves to a PlutuSadadApiResponse instance.
   */
  async verify(
    mobileNumber: string,
    birthYear: number,
    amount: number
  ): Promise<PlutuSadadApiResponse> {
    // Validate parameters
    if (!this.validateSadadMobileNumber(mobileNumber)) {
      return new PlutuSadadApiResponse(
        new PlutuApiResponse({
          success: false,
          status: 400,
          data: {
            error: {
              code: "INVALID_MOBILE_NUMBER",
              message: "Invalid mobile number format",
            },
          },
        })
      );
    }

    if (!this.validateBirthYear(birthYear)) {
      return new PlutuSadadApiResponse(
        new PlutuApiResponse({
          success: false,
          status: 400,
          data: {
            error: {
              code: "INVALID_BIRTH_YEAR",
              message: "Invalid birth year",
            },
          },
        })
      );
    }

    if (!this.validateAmount(amount)) {
      return new PlutuSadadApiResponse(
        new PlutuApiResponse({
          success: false,
          status: 400,
          data: {
            error: {
              code: "INVALID_AMOUNT",
              message: "Invalid amount",
            },
          },
        })
      );
    }

    const params = {
      mobile_number: mobileNumber,
      birth_year: birthYear,
      amount,
    };
    const apiResponse = await this.callApi(params, "verify", this.gateway);
    return new PlutuSadadApiResponse(apiResponse);
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
  async confirm(
    processId: string,
    code: string,
    amount: number,
    invoiceNo: string
  ): Promise<PlutuSadadApiResponse> {
    // Validate parameters
    if (!this.validateProcessId(processId)) {
      return new PlutuSadadApiResponse(
        new PlutuApiResponse({
          success: false,
          status: 400,
          data: {
            error: {
              code: "INVALID_PROCESS_ID",
              message: "Invalid process ID",
            },
          },
        })
      );
    }

    if (!this.validateSadadCode(code)) {
      return new PlutuSadadApiResponse(
        new PlutuApiResponse({
          success: false,
          status: 400,
          data: {
            error: {
              code: "INVALID_CODE",
              message: "Invalid confirmation code",
            },
          },
        })
      );
    }

    if (!this.validateAmount(amount)) {
      return new PlutuSadadApiResponse(
        new PlutuApiResponse({
          success: false,
          status: 400,
          data: {
            error: {
              code: "INVALID_AMOUNT",
              message: "Invalid amount",
            },
          },
        })
      );
    }

    if (!this.validateInvoiceNo(invoiceNo)) {
      return new PlutuSadadApiResponse(
        new PlutuApiResponse({
          success: false,
          status: 400,
          data: {
            error: {
              code: "INVALID_INVOICE_NO",
              message: "Invalid invoice number",
            },
          },
        })
      );
    }

    const params = {
      process_id: processId,
      code,
      amount,
      invoice_no: invoiceNo,
    };
    const apiResponse = await this.callApi(params, "confirm", this.gateway);
    return new PlutuSadadApiResponse(apiResponse);
  }
}
