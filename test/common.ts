import sinon from 'sinon';

export function getFakes(validator: (url: string, options: RequestInit) => void, output: any) {
  const fetch = (target: string | URL | Request, options?: RequestInit) => {
    const url = typeof target === 'string' ? target
      : target instanceof Request ? target.url
      : target.toString();
    validator(url, options || {});

    const rval = (function rval() {
      const json = function json() {
        return output;
      };
      return {
        json,
      };
    })();
    return Promise.resolve(rval as unknown as Response);
  };

  return { fetch };
}

const sandbox = sinon.createSandbox();

export function stubNetwork(validator: (url: string, options: RequestInit) => void, output: any) {
  const fakes = getFakes(validator, output);
  sandbox.stub(globalThis, 'fetch').callsFake(fakes.fetch);
}

afterEach(() => {
  sandbox.restore();
});

export function bodyToRecord(b: BodyInit | null | undefined) {
  if (b instanceof URLSearchParams) return Object.fromEntries(b);
  // if (b instanceof FormData) return Object.fromEntries(b.entries());
  return {};
}

export const config = {
  username: 'valid@email.com',
  apiKey: 'randomcharactersonlyq32YIpC8aMSH',
  apiURL: 'https://valid.realm.url/api/v1',
  realm: 'https://valid.realm.url/api',
};
