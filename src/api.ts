import type { ZulipRC } from './zuliprc';

type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH';

export type ZulipSuccess<T extends object> = T & {
  result: 'success',
  msg: string,
  ignored_parameters_unsupported?: string[]
}

export type ZulipError = {
  result: 'error',
  msg: string,
  code: string // TODO: union type?
}

export default async function api<T extends object>(
  endpoint: string,
  config: ZulipRC,
  method: HttpMethod,
  params?: Record<string, any>,
): Promise<ZulipSuccess<T> | ZulipError> {
  const url = new URL(config.apiURL + endpoint);
  const auth = Buffer.from(`${config.username}:${config.apiKey}`).toString('base64');
  const options: RequestInit = { method, headers: { Authorization: `Basic ${auth}` } };

  if (params) {
    const search = method === 'POST' || method === 'PATCH'
      ? options.body = new URLSearchParams()
      : url.searchParams;

    Object.entries(params).forEach(([key, value]) => {
      const data = Array.isArray(value) ? JSON.stringify(value) : value;
      search.append(key, data);
    });
  }

  const response = await fetch(url, options);

  try {
    return await response.json();
  } catch (e) {
    if (e instanceof SyntaxError) {
      // We probably got a non-JSON response from the server.
      // We should inform the user of the same.
      let message = 'Server Returned a non-JSON response.';
      if (response.status === 404) {
        message += ` Maybe endpoint: ${method} ${response.url.replace(
          config.apiURL,
          '',
        )} doesn't exist.`;
      } else {
        message += ' Please check the API documentation.';
      }
      const error: any = new Error(message);
      error.res = response;
      throw error;
    }
    throw e;
  }
}
