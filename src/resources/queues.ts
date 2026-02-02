import type { ZulipRC } from '../zuliprc';
import api from '../api';

export interface RegisterQueueParams {
  apply_markdown?: boolean,
  client_gravatar?: boolean,
  include_subscribers?: 'true' | 'false' | 'partial',
  slim_presence?: boolean,
  presence_history_limit_days?: number,
  event_types?: string[],
  all_public_streams?: boolean,
  client_capabilities?: any, // TODO
  fetch_event_types?: string[],
  narrow?: [string, string][] // TODO
}

export interface RegisterQueueResponse {
  queue_id: string | null,
  last_event_id: number,
  zulip_feature_level: number,
  zulip_version: string,
  zulip_merge_base?: string, // new?
  result: string,
  msg: string,
  [key: string]: any // TODO: fields depend on fetch_event_types
}

export interface DeregisterQueueParams {
  queue_id: string;
}

export interface DeregisterQueueResponse {
  // TODO
  msg: string,
  result: string,

  code?: string,
  queue_id?: string
}

export default function queues(config: ZulipRC) {
  return {
    register: (params: RegisterQueueParams): Promise<RegisterQueueResponse> => {
      const url = `${config.apiURL}/register`;
      return api(url, config, 'POST', params);
    },
    deregister: (params: DeregisterQueueParams): Promise<DeregisterQueueResponse> => {
      const url = `${config.apiURL}/events`;
      return api(url, config, 'DELETE', params);
    },
  };
}
