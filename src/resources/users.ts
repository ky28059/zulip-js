import type { ZulipRC } from '../zuliprc';
import type { User } from '../types/users';
import type { GroupSettingValue } from '../types/groups';
import api from '../api';

export interface GetUsersParams {
  client_gravatar?: boolean,
  include_custom_profile_fields?: boolean,
  user_ids?: number[]
}

export interface GetUsersResponse {
  members: User[]
}

export interface CreateUserParams {
  email: string,
  password: string,
  full_name: string
}

export interface CreateUserResponse {
  user_id: number
}

// {@Link https://zulip.com/api/subscribe}
export interface AddSubscriptionParams {
  subscriptions: { name: string, description?: string }[],
  principals?: string[] | number[],
  authorization_errors_fatal?: boolean,
  announce?: boolean,
  invite_only?: boolean,
  is_web_public?: boolean,
  is_default_stream?: boolean,
  history_public_to_subscribers?: boolean,
  message_retention_days?: string | number | 'realm_default' | 'unlimited',
  topics_policy?: 'inherit' | 'allow_empty_topic' | 'disable_empty_topic' | 'empty_topic_only',
  can_add_subscribers_group?: GroupSettingValue,
  can_remove_subscribers_group?: GroupSettingValue,
  can_administer_channel_group?: GroupSettingValue,
  can_delete_any_message_group?: GroupSettingValue,
  can_delete_own_message_group?: GroupSettingValue,
  can_move_messages_out_of_channel_group?: GroupSettingValue,
  can_move_messages_within_channel_group?: GroupSettingValue,
  can_send_message_group?: GroupSettingValue,
  can_subscribe_group?: GroupSettingValue,
  can_resolve_topics_group?: GroupSettingValue,
  can_create_topic_group?: GroupSettingValue,
  folder_id?: number,
  send_new_subscription_messages?: boolean
}

export interface AddSubscriptionResponse {
  subscribed: Record<string, string[]>,
  already_subscribed: Record<string, string[]>,
  unauthorized?: string[],
  new_subscription_messages_sent?: boolean
}

export interface RemoveSubscriptionParams {
  subscriptions: string[],
  principals?: string[] | number[]
}

export interface RemoveSubscriptionResponse {
  removed: string[],
  not_removed: string[]
}

export interface GetAlertWordsResponse {
  alert_words: string[]
}

// {@Link https://zulip.com/api/add-alert-words}
export interface AddAlertWordsParams {
  alert_words: string[]
}

export interface AddAlertWordsResponse {
  alert_words: string[]
}

// {@Link https://zulip.com/api/remove-alert-words}
export interface RemoveAlertWordsParams {
  alert_words: string[]
}

export interface RemoveAlertWordsResponse {
  alert_words: string[]
}

export default function users(config: ZulipRC) {
  return {
    retrieve: (params?: GetUsersParams) => {
      return api<GetUsersResponse>('/users', config, 'GET', params);
    },
    create: (params: CreateUserParams) => {
      return api<CreateUserResponse>('/users', config, 'POST', params);
    },
    me: {
      getProfile: () => {
        return api<User & { max_message_id: number }>('/users/me', config, 'GET'); // TODO?
      },
      subscriptions: {
        add: (params: AddSubscriptionParams) => {
          return api<AddSubscriptionResponse>('/users/me/subscriptions', config, 'POST', params);
        },
        remove: (params: RemoveSubscriptionParams) => {
          return api<RemoveSubscriptionResponse>('/users/me/subscriptions', config, 'DELETE', params);
        },
      },
      alertWords: {
        retrieve: () => {
          return api<GetAlertWordsResponse>('/users/me/alert_words', config, 'GET');
        },
        add: (params: AddAlertWordsParams) => {
          return api<AddAlertWordsResponse>('/users/me/alert_words', config, 'POST', params);
        },
        remove: (params: RemoveAlertWordsParams) => {
          return api<RemoveAlertWordsResponse>('/users/me/alert_words', config, 'DELETE', params);
        },
      },
    },
  };
}
