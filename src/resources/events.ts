import type { ZulipRC } from '../zuliprc';
import api from '../api';

interface RetrieveEventsParams {
  queue_id: string,
  last_event_id?: number,
  dont_block?: boolean
}

export default function events(config: ZulipRC) {
  return {
    retrieve: (params: RetrieveEventsParams) => {
      const url = `${config.apiURL}/events`;
      return api(url, config, 'GET', params);
    },
  };
}
