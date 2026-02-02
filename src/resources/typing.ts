import type { ZulipRC } from '../zuliprc';
import api from '../api';

export interface TypingParams {
  type?: 'direct' | 'stream' | 'channel',
  op: 'start' | 'stop',
  to?: number[],
  stream_id?: number,
  topic?: string
}

export default function typing(config: ZulipRC) {
  return {
    send: (params: TypingParams) => {
      const url = `${config.apiURL}/typing`;
      return api<{}>(url, config, 'POST', params);
    },
  };
}
