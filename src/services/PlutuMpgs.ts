// src/services/PlutuMpgs.ts
import { PlutuService } from "./PlutuService";
import { PlutuMpgsApiResponse } from "./responses/PlutuMpgsApiResponse";
import { PlutuApiResponse } from "./responses/PlutuApiResponse";

export class PlutuMpgs extends PlutuService {
  private gateway: string = "mpgs";

  /**
   * Confirm a payment with the Plutu MPGS gateway.
   *
   * @param amount - The amount to confirm.
   * @param invoiceNo - The invoice number.
   * @param returnUrl - The return URL.
   * @param lang - The language preference ("en" | "ar").
   * @param customerIp - The customer's IP address (optional).
   * @returns A promise that resolves to a PlutuMpgsApiResponse instance.
   */
  async confirm(
    amount: number,
    invoiceNo: string,
    returnUrl: string,
    lang?: "en" | "ar",
    customerIp?: string
  ): Promise<PlutuMpgsApiResponse> {
    const params: any = {
      amount,
      invoice_no: invoiceNo,
      return_url: returnUrl,
    };

    if (lang) params.lang = lang;
    if (customerIp) params.customer_ip = customerIp;

    const apiResponse = await this.callApi(params, "confirm", this.gateway);
    return new PlutuMpgsApiResponse(apiResponse);
  }

  /**
   * Handle callback from the Plutu MPGS gateway.
   *
   * @param parameters - The callback parameters.
   * @returns A promise that resolves to the processed parameters.
   */
  async callbackHandler(parameters: any): Promise<any> {
    const callbackParameters = [
      "gateway",
      "approved",
      "invoice_no",
      "amount",
      "transaction_id",
    ];
    const data = this.getCallbackParameters(parameters, callbackParameters);
    this.checkValidCallbackHash(parameters, data);

    return parameters; // You can wrap this in a specific callback response class if needed
  }
}
