// src/services/PlutuAdfali.ts
import { PlutuService } from "./PlutuService";
import { PlutuApiResponse } from "./responses/PlutuApiResponse";
import { PlutuAdfaliApiResponse } from "./responses/PlutuAdfaliApiResponse";

export class PlutuAdfali extends PlutuService {
  private gateway: string = "edfali";

  async verify(
    mobileNumber: string,
    amount: number
  ): Promise<PlutuAdfaliApiResponse> {
    if (!mobileNumber || !amount) throw new Error("Invalid parameters");
    const params = { mobile_number: mobileNumber, amount };
    try {
      const responseData = await this.callApi(params, "verify", this.gateway);
      const plutuApiResponse = new PlutuApiResponse(responseData);
      return new PlutuAdfaliApiResponse(plutuApiResponse);
    } catch (error) {
      throw error;
    }
  }

  async confirm(
    processId: string,
    code: string,
    amount: number,
    invoiceNo: string
  ): Promise<PlutuAdfaliApiResponse> {
    const params = {
      process_id: processId,
      code,
      amount,
      invoice_no: invoiceNo,
    };
    try {
      const responseData = await this.callApi(params, "confirm", this.gateway);
      const plutuApiResponse = new PlutuApiResponse(responseData);
      return new PlutuAdfaliApiResponse(plutuApiResponse);
    } catch (error) {
      throw error;
    }
  }
}
