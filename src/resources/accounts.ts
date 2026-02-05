import type { ZulipRC } from '../zuliprc';

export default function accounts(config: ZulipRC) {
  return {
    retrieve: async (): Promise<any> => {
      const url = `${config.apiURL}/fetch_api_key`;
      const form = new FormData();
      form.append('username', config.username);
      form.append('password', (config as any).password);
      const res = await fetch(url, {
        method: 'POST',
        body: form,
      });
      return res.json();
    },
  };
}
