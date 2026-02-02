import type { ZulipRC } from '../zuliprc';
import api from '../api';

export default function reactions(config: ZulipRC) {
  const call = (method: 'POST' | 'DELETE', initParams: any) => {
    const { message_id, ...params } = initParams;
    return api(
      `${config.apiURL}/messages/${message_id}/reactions`,
      config,
      method,
      params
    );
  };
  return {
    add: (params: any) => call('POST', params),
    remove: (params: any) => call('DELETE', params),
  };
}
