// src/http/HttpClient.ts
import axios, { AxiosResponse, AxiosError } from "axios";
import { HttpClientInterface } from "./HttpClientInterface";

export interface ApiResponse {
  success: boolean;
  status: number;
  data: any;
  error?: {
    code: string;
    message: string;
  };
}

export class HttpClient implements HttpClientInterface {
  async request(
    url: string,
    method: string,
    params: any = {},
    headers: any = {}
  ): Promise<ApiResponse> {
    try {
      const response: AxiosResponse = await axios({
        method,
        url,
        headers,
        data: params,
        timeout: 60000,
      });
      return {
        success: true,
        status: response.status,
        data: response.data,
      };
    } catch (error: any) {
      if (error.response) {
        // API responded with a status outside the 2xx range
        const apiError = error.response.data?.error || {};
        return {
          success: false,
          status: error.response.status,
          data: error.response.data,
          error: {
            code: apiError.code || "UNKNOWN_ERROR",
            message: apiError.message || "An unknown error occurred",
          },
        };
      } else if (error.request) {
        // No response received from the server
        return {
          success: false,
          status: 500,
          data: null,
          error: {
            code: "NO_RESPONSE",
            message: "No response received from the server",
          },
        };
      } else {
        // Error setting up the request
        return {
          success: false,
          status: 500,
          data: null,
          error: {
            code: "REQUEST_SETUP_ERROR",
            message: error.message || "Error setting up the request",
          },
        };
      }
    }
  }
}
