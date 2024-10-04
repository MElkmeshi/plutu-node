// src/services/PlutuService.ts
import { HttpClientInterface } from "../http/HttpClientInterface";
import { HttpClient } from "../http/HttpClient";
import { config } from "../config/plutu";
import * as crypto from "crypto";
import { PlutuApiResponse } from "./responses/PlutuApiResponse"; // Import the response class

export abstract class PlutuService {
  protected httpClient: HttpClientInterface;
  protected apiKey: string;
  protected accessToken: string;
  protected secretKey: string;
  protected baseUrl: string;
  protected apiVersion: string;

  constructor(httpClient: HttpClientInterface = new HttpClient()) {
    this.httpClient = httpClient;
    this.apiKey = config.apiKey;
    this.accessToken = config.accessToken;
    this.secretKey = config.secretKey;
    this.baseUrl = config.baseUrl;
    this.apiVersion = config.apiVersion;
  }

  protected getApiHeaders(): { [key: string]: string } {
    return {
      Accept: "application/json",
      "X-API-KEY": this.apiKey,
      Authorization: `Bearer ${this.accessToken}`,
    };
  }

  protected getApiUrl(action: string, gateway: string): string {
    return `${this.baseUrl}/${this.apiVersion}/transaction/${gateway}/${action}`;
  }

  /**
   * Calls the Plutu API and returns a PlutuApiResponse instance.
   *
   * @param params - The request parameters.
   * @param action - The action to perform (e.g., 'verify', 'confirm').
   * @param gateway - The payment gateway identifier (e.g., 'edfali').
   * @returns A promise that resolves to a PlutuApiResponse instance.
   */
  protected async callApi(
    params: any,
    action: string,
    gateway: string
  ): Promise<PlutuApiResponse> {
    const url = this.getApiUrl(action, gateway);
    const headers = this.getApiHeaders();
    const apiResponse = await this.httpClient.request(
      url,
      "POST",
      params,
      headers
    );
    return new PlutuApiResponse(apiResponse);
  }

  /**
   * Helper to filter and build query string from callback parameters.
   */
  protected getCallbackParameters(
    parameters: any,
    callbackParameters: string[]
  ): string {
    return Object.keys(parameters)
      .filter((key) => callbackParameters.includes(key))
      .map((key) => `${key}=${parameters[key]}`)
      .join("&");
  }

  /**
   * Helper to verify callback hash.
   */
  protected checkValidCallbackHash(parameters: any, data: string): void {
    const receivedHash = parameters["hashed"];
    const generatedHash = crypto
      .createHmac("sha256", this.secretKey)
      .update(data)
      .digest("hex")
      .toUpperCase();

    if (
      !receivedHash ||
      !crypto.timingSafeEqual(
        Buffer.from(receivedHash),
        Buffer.from(generatedHash)
      )
    ) {
      throw new Error("Invalid callback hash");
    }
  }

  /**
   * Validation Methods
   */
  protected validateMobileNumber(mobileNumber: string): boolean {
    const regex = /^09[1-6][0-9]{7}$/;
    return regex.test(mobileNumber);
  }

  protected validateSadadMobileNumber(mobileNumber: string): boolean {
    const regex = /^09[13][0-9]{7}$/;
    return regex.test(mobileNumber);
  }

  protected validateBirthYear(birthYear: number): boolean {
    const currentYear = new Date().getFullYear();
    return (
      typeof birthYear === "number" &&
      birthYear >= 1940 &&
      birthYear <= currentYear - 12
    );
  }

  protected validateAmount(amount: number): boolean {
    return typeof amount === "number" && amount > 0;
  }

  protected validateProcessId(processId: string): boolean {
    return /^\d+$/.test(processId);
  }

  protected validateCode(code: string): boolean {
    return /^\d{4}$/.test(code); // For PlutuAdfali
  }

  protected validateSadadCode(code: string): boolean {
    return /^\d{6}$/.test(code); // For PlutuSadad
  }

  protected validateInvoiceNo(invoiceNo: string): boolean {
    const regex = /^[A-Za-z0-9.\-_]+$/;
    return regex.test(invoiceNo) && invoiceNo.trim() !== "";
  }

  protected validateCallbackUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  protected validateReturnUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  // Add more validation methods as needed
}
