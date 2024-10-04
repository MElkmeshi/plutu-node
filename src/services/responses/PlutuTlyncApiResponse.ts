// src/services/Responses/PlutuTlyncApiResponse.ts
import { PlutuApiResponse } from "./PlutuApiResponse";

export class PlutuTlyncApiResponse {
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
   * Get the Redirect URL from the response.
   */
  getRedirectUrl(): string | null {
    return this.plutuApiResponse.getResultValue("redirect_url");
  }

  /**
   * Get the Transaction ID from the response.
   */
  getTransactionId(): string | null {
    return this.plutuApiResponse.getResultValue("transaction_id");
  }

  // Add more methods as needed based on API response structure
}
