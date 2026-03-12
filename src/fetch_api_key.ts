import type { ZulipSuccess } from './api';

// {@Link https://zulip.com/api/fetch-api-key}
export interface FetchApiKeyResponse {
  api_key: string,
  email: string,
  user_id: number
}

export default async function fetchApiKey(config: { username: string, password: string, apiURL: string }) {
  const res = await fetch(`${config.apiURL}/fetch_api_key`, {
    method: 'POST',
    body: new URLSearchParams({
      username: config.username,
      password: config.password,
    }),
  })

  return await res.json() as ZulipSuccess<FetchApiKeyResponse>;
}
