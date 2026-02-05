import type { ZulipRC } from '../zuliprc';
import type { Message, MessageFlag } from '../types/messages';
import type { ReactionType } from '../types/reactions';
import api from '../api';

// {@Link https://zulip.com/api/get-messages}
export interface GetMessagesParams {
  anchor?: string | number | 'newest' | 'oldest' | 'first_unread' | 'date',
  include_anchor?: boolean,
  anchor_date?: string,
  num_before?: number,
  num_after?: number,
  narrow?: any[], // TODO
  client_gravatar?: boolean,
  apply_markdown?: boolean,
  message_ids?: number[],
  allow_empty_topic_name?: boolean,
  use_first_unread_anchor?: boolean
}

export interface GetMessagesResponse {
  anchor?: number,
  found_newest: boolean,
  found_oldest: boolean,
  found_anchor: boolean,
  history_limited: boolean,
  messages: (Message & {
    flags: MessageFlag[],
    match_content?: string,
    match_subject?: string,
  })[],
}

// {@Link https://zulip.com/api/send-message}
export interface SendMessageParams {
  type: 'private' | 'stream' | 'direct' | 'channel',
  to: string | number | number[] | string[],
  content: string,
  topic?: string,
  queue_id?: string,
  local_id?: string,
  read_by_sender?: boolean
}

export interface SendMessageResponse {
  id: number,
  automatic_new_visibility_policy?: number
}

// {@Link https://zulip.com/api/render-message}
export interface RenderMessageParams {
  content: string
}

export interface RenderMessageResponse {
  rendered: string
}

// {@Link https://zulip.com/api/update-message}
export interface UpdateMessageParams {
  message_id: number,
  topic?: string,
  propagate_mode?: 'change_one' | 'change_later' | 'change_all',
  send_notification_to_old_thread?: boolean,
  send_notification_to_new_thread?: boolean,
  content?: string,
  prev_content_sha256?: string,
  stream_id?: number
}

export interface UpdateMessageResponse {
  detached_uploads: {
    id: number,
    name: string,
    path_id: string,
    size: number,
    create_time: number,
    messages: {
      id: number,
      date_sent: number
    }[]
  }[]
}

// {@Link https://zulip.com/api/update-message-flags}
export interface UpdateMessageFlagsParams {
  messages: number[],
  flag: MessageFlag
}

export interface UpdateMessageFlagsResponse {
  messages: number[],
  ignored_because_not_subscribed_channels?: number[]
}

// {@Link https://zulip.com/api/get-message}
export interface GetMessageParams {
  message_id: number,
  apply_markdown?: boolean,
  allow_empty_topic_name?: boolean
}

export interface GetMessageResponse {
  raw_content: string,
  message: Message & { flags: MessageFlag[] };
}

// {@Link https://zulip.com/api/get-message-history}
export interface GetMessageHistoryParams {
  message_id: number,
  allow_empty_topic_name?: boolean,
}

export interface GetMessageHistoryResponse {
  message_history: {
    topic: string,
    prev_topic?: string,
    stream?: number,
    prev_stream?: number,
    content: string,
    rendered_content: string,
    prev_content?: string,
    prev_rendered_content?: string,
    user_id: number | null,
    content_html_diff?: string,
    timestamp: number,
  }[]
}

// {@Link https://zulip.com/api/remove-reaction}
export interface DeleteReactionParams {
  message_id: number,
  emoji_name?: string,
  emoji_code?: string,
  reaction_type?: ReactionType
}

// {@Link https://zulip.com/api/delete-message}
export interface DeleteMessageParams {
  message_id: number
}

export default function messages(config: ZulipRC) {
  const baseURL = `${config.apiURL}/messages`;
  const flagsURL = `${baseURL}/flags`;
  return {
    retrieve: (params: GetMessagesParams) => {
      const url = `${config.apiURL}/messages`;
      return api<GetMessagesResponse>(url, config, 'GET', params);
    },
    send: (params: SendMessageParams) => {
      const url = `${config.apiURL}/messages`;
      return api<SendMessageResponse>(url, config, 'POST', params);
    },
    render: (initialParams: RenderMessageParams | string) => {
      const url = `${config.apiURL}/messages/render`;
      const params: RenderMessageParams = typeof initialParams === 'string'
        ? { content: initialParams }
        : initialParams;

      return api<RenderMessageResponse>(url, config, 'POST', params);
    },
    update: (params: UpdateMessageParams) => {
      const url = `${config.apiURL}/messages/${params.message_id}`;
      return api<UpdateMessageResponse>(url, config, 'PATCH', params as any);
    },
    flags: {
      add: (initialParams: UpdateMessageFlagsParams) => {
        const params = { ...initialParams, op: 'add' };
        return api<UpdateMessageFlagsResponse>(flagsURL, config, 'POST', params);
      },
      remove: (initialParams: UpdateMessageFlagsParams) => {
        const params = { ...initialParams, op: 'remove' };
        return api<UpdateMessageFlagsResponse>(flagsURL, config, 'POST', params);
      },
    },
    getById: (params: GetMessageParams) => {
      const url = `${config.apiURL}/messages/${params.message_id}`;
      return api<GetMessageResponse>(url, config, 'GET', params);
    },
    getHistoryById: (params: GetMessageHistoryParams) => {
      const url = `${config.apiURL}/messages/${params.message_id}/history`;
      return api<GetMessageHistoryResponse>(url, config, 'GET', params);
    },
    deleteReactionById: (params: DeleteReactionParams) => {
      const url = `${config.apiURL}/messages/${params.message_id}/reactions`;
      return api<{}>(url, config, 'DELETE', params);
    },
    deleteById: (params: DeleteMessageParams) => {
      const url = `${config.apiURL}/messages/${params.message_id}`;
      return api<{}>(url, config, 'DELETE', params);
    },
  };
}
