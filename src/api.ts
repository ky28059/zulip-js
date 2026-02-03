import type { ZulipRC } from './zuliprc';

type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH';

type ZulipSuccess<T extends object> = T & {
  result: 'success',
  msg: string,
  ignored_parameters_unsupported?: string[]
}

type ZulipError = {
  result: 'error',
  msg: string,
  code: string // TODO?
}

async function api<T extends object>(
  baseUrl: string,
  config: ZulipRC,
  method: HttpMethod,
  params?: Record<string, any>,
): Promise<ZulipSuccess<T> | ZulipError> {
  const url = new URL(baseUrl);
  const auth = Buffer.from(`${config.username}:${config.apiKey}`).toString(
    'base64',
  );
  const authHeader = `Basic ${auth}`;
  const options: RequestInit = { method, headers: { Authorization: authHeader } };
  if (method === 'POST' || method === 'PATCH') {
    options.body = new FormData();
    Object.keys(params!).forEach((key) => {
      let data = params![key];
      if (Array.isArray(data)) {
        data = JSON.stringify(data);
      }
      (options.body as FormData).append(key, data);
    });
  } else if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  const response = await fetch(url.href, options);
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

export default api;
