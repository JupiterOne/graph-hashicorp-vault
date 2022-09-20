import fetch, { Response } from 'node-fetch';

class HTTPError extends Error {
  readonly statusCode: number;
  readonly statusText: string;

  constructor(options: { statusCode: number; statusText: string }) {
    super(options.statusText);
    Object.setPrototypeOf(this, HTTPError.prototype);

    this.statusCode = options.statusCode;
    this.statusText = options.statusText;
  }
}

export async function fetchOrThrow(uri, options): Promise<Response> {
  const response = await fetch(uri, options);
  if (!response.ok && response.status !== 404) {
    throw new HTTPError({
      statusText: response.statusText,
      statusCode: response.status,
    });
  }

  return response;
}
