// src/services/PlutuTlync.ts
import { PlutuService } from "./PlutuService";
import { PlutuTlyncApiResponse } from "./responses/PlutuTlyncApiResponse";
import { PlutuApiResponse } from "./responses/PlutuApiResponse";

export class PlutuTlync extends PlutuService {
  private gateway: string = "tlync";

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
  async confirm(
    mobileNumber: string,
    amount: number,
    invoiceNo: string,
    returnUrl: string,
    callbackUrl: string,
    lang?: "en" | "ar",
    customerIp?: string
  ): Promise<PlutuTlyncApiResponse> {
    const params: any = {
      mobile_number: mobileNumber,
      amount,
      invoice_no: invoiceNo,
      return_url: returnUrl,
      callback_url: callbackUrl,
    };

    if (lang) params.lang = lang;
    if (customerIp) params.customer_ip = customerIp;

    const apiResponse = await this.callApi(params, "confirm", this.gateway);
    return new PlutuTlyncApiResponse(apiResponse);
  }

  /**
   * Handle callback from the Plutu Tlync gateway.
   *
   * @param parameters - The callback parameters.
   * @returns A promise that resolves to the processed parameters.
   */
  async callbackHandler(parameters: any): Promise<any> {
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
