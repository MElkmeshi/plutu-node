// src/services/Responses/PlutuApiResponse.ts
export class PlutuApiResponse {
  private success: boolean;
  private status: number;
  private data: any;
  private error?: {
    code: string;
    message: string;
  };

  constructor(apiResponse: any) {
    this.success = apiResponse.success;
    this.status = apiResponse.status;
    this.data = apiResponse.data;
    this.error = apiResponse.error;
  }

  isSuccessful(): boolean {
    return this.success;
  }

  getStatusCode(): number {
    return this.status;
  }

  getBody(): any {
    return this.data;
  }

  getResult(): any {
    return this.data?.result || {};
  }

  getResultValue(key: string | null = null): any {
    if (key === null) {
      return this.getResult();
    } else {
      return this.getResult()[key] || null;
    }
  }

  hasError(): boolean {
    return !this.success;
  }

  getErrorCode(): string {
    return this.error?.code || "UNKNOWN_ERROR";
  }

  getErrorMessage(): string {
    return this.error?.message || "An unknown error occurred";
  }

  getErrorFields(): any {
    return this.data?.error?.fields || null;
  }
}
