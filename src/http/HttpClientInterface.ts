export interface HttpClientInterface {
  request(
    url: string,
    method: string,
    params?: any,
    headers?: any
  ): Promise<any>;
}
