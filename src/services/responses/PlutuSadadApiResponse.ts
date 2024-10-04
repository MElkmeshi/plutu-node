// src/services/Responses/PlutuSadadApiResponse.ts
import { PlutuApiResponse } from "./PlutuApiResponse";

export class PlutuSadadApiResponse {
  private plutuApiResponse: PlutuApiResponse;

  constructor(plutuApiResponse: PlutuApiResponse) {
    this.plutuApiResponse = plutuApiResponse;
  }

  /**
   * Get the original Plutu API response.
   */
  getOriginalResponse(): PlutuApiResponse {
    return this.plutuApiResponse;
  }

  /**
   * Get the Process ID from the response.
   */
  getProcessId(): string | null {
    return this.plutuApiResponse.getResultValue("process_id").toString();
  }

  /**
   * Get the Transaction ID from the response.
   */
  getTransactionId(): string | null {
    return this.plutuApiResponse.getResultValue("transaction_id");
  }
}
