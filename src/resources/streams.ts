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
      return api<GetStreamsResponse>('/streams', config, 'GET', params);
    },
    getStreamId: (initialParams: string | GetStreamIdParams) => {
      const params = typeof initialParams === 'string' ? { stream: initialParams } : initialParams;
      return api<GetStreamIdResponse>('/get_stream_id', config, 'GET', params);
    },
    subscriptions: {
      retrieve: (params?: GetSubscriptionsParams) => {
        return api<GetSubscriptionsResponse>('/users/me/subscriptions', config, 'GET', params);
      },
    },
    topics: {
      retrieve: (params: GetStreamTopicsParams) => {
        const { stream_id, ...rest } = params;
        const url = `/users/me/${stream_id}/topics`;
        return api<GetStreamTopicsResponse>(url, config, 'GET', rest);
      },
    },
    deleteById: (params: DeleteStreamParams) => {
      const url = `/streams/${params.stream_id}`;
      return api<{}>(url, config, 'DELETE');
    },
  };
}
