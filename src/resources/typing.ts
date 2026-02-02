import type { ZulipRC } from '../zuliprc';
import api from '../api';

export default function typing(config: ZulipRC) {
  return {
    send: (initialParams: any) => {
      const url = `${config.apiURL}/typing`;
      const params = { ...initialParams };
      if (params.to.length > 1) {
        params.to = JSON.stringify(params.to);
      }
      return api(url, config, 'POST', params);
    },
  };
}
