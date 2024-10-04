// src/services/PlutuLocalBankCards.ts
import { PlutuService } from "./PlutuService";
import { PlutuLocalBankCardsApiResponse } from "./responses/PlutuLocalBankCardsApiResponse";
import { PlutuApiResponse } from "./responses/PlutuApiResponse";

export class PlutuLocalBankCards extends PlutuService {
  private gateway: string = "localbankcards";

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
  async confirm(
    amount: number,
    invoiceNo: string,
    returnUrl: string,
    lang?: "en" | "ar",
    customerIp?: string
  ): Promise<PlutuLocalBankCardsApiResponse> {
    // Validate parameters
    if (!this.validateAmount(amount)) {
      return new PlutuLocalBankCardsApiResponse(
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
      return new PlutuLocalBankCardsApiResponse(
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

    if (!this.validateReturnUrl(returnUrl)) {
      return new PlutuLocalBankCardsApiResponse(
        new PlutuApiResponse({
          success: false,
          status: 400,
          data: {
            error: {
              code: "INVALID_RETURN_URL",
              message: "Invalid return URL",
            },
          },
        })
      );
    }

    const params: any = {
      amount,
      invoice_no: invoiceNo,
      return_url: returnUrl,
    };

    if (customerIp) params.customer_ip = customerIp;
    if (lang) params.lang = lang;

    const apiResponse = await this.callApi(params, "confirm", this.gateway);
    return new PlutuLocalBankCardsApiResponse(apiResponse);
  }

  /**
   * Handle callback from the Plutu LocalBankCards gateway.
   *
   * @param parameters - The callback parameters.
   * @returns A promise that resolves to the processed parameters.
   */
  async callbackHandler(parameters: any): Promise<any> {
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
