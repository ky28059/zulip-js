import type { ZulipRC } from '../zuliprc';
import type { Stream, StreamTopic, Subscription } from '../types/streams';
import api from '../api';

// {@Link https://zulip.com/api/get-streams}
export interface GetStreamsParams {
  include_public?: boolean,
  include_web_public?: boolean,
  include_subscribed?: boolean,
  exclude_archived?: boolean,
  include_all?: boolean,
  include_default?: boolean,
  include_owner_subscribed?: boolean,
  include_can_access_content?: boolean
}

export interface GetStreamsResponse {
  streams: Stream[]
}

// {@Link https://zulip.com/api/get-stream-id}
export interface GetStreamIdParams {
  stream: string
}

export interface GetStreamIdResponse {
  stream_id: number
}

// {@Link https://zulip.com/api/get-subscriptions}
export interface GetSubscriptionsParams {
  include_subscribers?: boolean | 'true' | 'false' | 'partial'
}

export interface GetSubscriptionsResponse {
  subscriptions: Subscription[]
}

// {@Link https://zulip.com/api/get-stream-topics}
export interface GetStreamTopicsParams {
  stream_id: number,
  allow_empty_topic_name?: boolean
}

export interface GetStreamTopicsResponse {
  topics: StreamTopic[]
}

// {@Link https://zulip.com/api/archive-stream}
export interface DeleteStreamParams {
  stream_id: number
}

export default function streams(config: ZulipRC) {
  return {
    retrieve: (params?: GetStreamsParams) => {
      const url = `${config.apiURL}/streams`;
      return api<GetStreamsResponse>(url, config, 'GET', params);
    },
    getStreamId: (initialParams: string | GetStreamIdParams) => {
      const url = `${config.apiURL}/get_stream_id`;
      const params = typeof initialParams === 'string' ? { stream: initialParams } : initialParams;
      return api<GetStreamIdResponse>(url, config, 'GET', params);
    },
    subscriptions: {
      retrieve: (params?: GetSubscriptionsParams) => {
        const url = `${config.apiURL}/users/me/subscriptions`;
        return api<GetSubscriptionsResponse>(url, config, 'GET', params);
      },
    },
    topics: {
      retrieve: (params: GetStreamTopicsParams) => {
        const { stream_id, ...rest } = params;
        const url = `${config.apiURL}/users/me/${stream_id}/topics`;
        return api<GetStreamTopicsResponse>(url, config, 'GET', rest);
      },
    },
    deleteById: (params: DeleteStreamParams) => {
      const url = `${config.apiURL}/streams/${params.stream_id}`;
      return api<{}>(url, config, 'DELETE');
    },
  };
}
