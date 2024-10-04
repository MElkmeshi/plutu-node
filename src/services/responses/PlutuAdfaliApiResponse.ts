// src/services/Responses/PlutuAdfaliApiResponse.ts
import { PlutuApiResponse } from "../responses/PlutuApiResponse";

export class PlutuAdfaliApiResponse {
  private plutuApiResponse: PlutuApiResponse;

  constructor(plutuApiResponse: PlutuApiResponse) {
    this.plutuApiResponse = plutuApiResponse;
  }

  getOriginalResponse(): PlutuApiResponse {
    return this.plutuApiResponse;
  }

  getProcessId(): string | null {
    return this.plutuApiResponse.getResultValue("process_id").toString();
  }

  getTransactionId(): string | null {
    return this.plutuApiResponse.getResultValue("transaction_id");
  }
}
