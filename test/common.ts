import sinon from 'sinon';

export function getFakes(validator: (url: string, options: RequestInit) => void, output: any) {
  const fetch = (url: string, options: RequestInit) => {
    validator(url, options);
    const rval = (function rval() {
      const json = function json() {
        return output;
      };
      return {
        json,
      };
    })();
    return Promise.resolve(rval);
  };
  const FormData = () => {
    const data: Record<string, any> = {};
    return {
      append(key: string, value: any) {
        data[key] = value;
      },
      data,
    };
  };
  return {
    fetch,
    FormData,
  };
}

const sandbox = sinon.createSandbox();

export function stubNetwork(validator: (url: string, options: RequestInit) => void, output: any) {
  const fakes = getFakes(validator, output);
  sandbox.stub(globalThis, 'fetch').callsFake(fakes.fetch);
  sandbox.stub(globalThis, 'FormData').callsFake(fakes.FormData);
}

afterEach(() => {
  sandbox.restore();
});

export const config = {
  username: 'valid@email.com',
  apiKey: 'randomcharactersonlyq32YIpC8aMSH',
  apiURL: 'https://valid.realm.url/api/v1',
  realm: 'https://valid.realm.url/api',
};
