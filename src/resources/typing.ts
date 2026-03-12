import type { ZulipRC } from '../zuliprc';
import api from '../api';

// {@Link https://zulip.com/api/set-typing-status}
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
      return api<{}>('/typing', config, 'POST', params);
    },
  };
}
