import type { ZulipRC } from '../zuliprc';
import type { EventType } from '../types/events';
import api from '../api';

// {@Link https://zulip.com/api/register-queue}
export interface RegisterQueueParams {
  apply_markdown?: boolean,
  client_gravatar?: boolean,
  include_subscribers?: 'true' | 'false' | 'partial',
  slim_presence?: boolean,
  presence_history_limit_days?: number,
  event_types?: EventType[],
  all_public_streams?: boolean,
  client_capabilities?: any, // TODO
  fetch_event_types?: EventType[],
  narrow?: [string, string][] // TODO
}

export interface RegisterQueueResponse {
  queue_id: string | null,
  last_event_id: number,
  zulip_feature_level: number,
  zulip_version: string,
  zulip_merge_base: string,
  [key: string]: any // TODO: fields depend on fetch_event_types
}

// {@Link https://zulip.com/api/delete-queue}
export interface DeregisterQueueParams {
  queue_id: string
}

export interface DeregisterQueueResponse {
  queue_id?: string // TODO
}

export default function queues(config: ZulipRC) {
  return {
    register: (params: RegisterQueueParams) => {
      return api<RegisterQueueResponse>('/register', config, 'POST', params);
    },
    deregister: (params: DeregisterQueueParams) => {
      return api<DeregisterQueueResponse>('/events', config, 'DELETE', params);
    },
  };
}
