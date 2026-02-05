import type { ZulipRC } from '../zuliprc';
import type { ZulipEvent } from '../types/events';
import api from '../api';

export interface RetrieveEventsParams {
  queue_id: string,
  last_event_id?: number,
  dont_block?: boolean
}

export interface RetrieveEventsResponse {
  events: ZulipEvent[],
  queue_id: string
}

export default function events(config: ZulipRC) {
  return {
    retrieve: (params: RetrieveEventsParams) => {
      const url = `${config.apiURL}/events`;
      return api<RetrieveEventsResponse>(url, config, 'GET', params);
    },
  };
}
