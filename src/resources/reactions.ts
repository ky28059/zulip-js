import type { ZulipRC } from '../zuliprc';
import api from '../api';

export default function reactions(config: ZulipRC) {
  const url = (messageID: number) => `${config.apiURL}/messages/${messageID}/reactions`;
  const call = (method: 'POST' | 'DELETE', initParams: any) => {
    const params = { ...initParams };
    delete params.message_id;
    return api(url(initParams.message_id), config, method, params);
  };
  return {
    add: (params: any) => call('POST', params),
    remove: (params: any) => call('DELETE', params),
  };
}
