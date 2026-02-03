import type { ZulipRC } from '../zuliprc';
import type { GroupSettingValue } from '../types/groups';
import api from '../api';

export interface User {
  user_id: number,
  delivery_email?: string | null,
  email: string,
  full_name: string,
  date_joined: string,
  is_active: boolean,
  is_owner: boolean,
  is_admin: boolean,
  is_guest: boolean,
  is_bot: boolean,
  bot_type: number | null, // TODO: enum
  bot_owner_id: number | null,
  role: number, // TODO: enum?
  timezone: string,
  avatar_url: string | null,
  avatar_version: number,
  is_imported_stub?: boolean,
  profile_data?: Record<string, {
    value: string,
    rendered_value?: string
  }>
}

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

export default function users(config: ZulipRC) {
  return {
    retrieve: (params?: GetUsersParams) => {
      const url = `${config.apiURL}/users`;
      return api<GetUsersResponse>(url, config, 'GET', params);
    },
    create: (params: CreateUserParams) => {
      const url = `${config.apiURL}/users`;
      return api<CreateUserResponse>(url, config, 'POST', params);
    },
    me: {
      getProfile: () => {
        const url = `${config.apiURL}/users/me`;
        return api<User & { max_message_id: number }>(url, config, 'GET'); // TODO?
      },
      subscriptions: {
        add: (params: AddSubscriptionParams) => {
          const url = `${config.apiURL}/users/me/subscriptions`;
          return api<AddSubscriptionResponse>(url, config, 'POST', params);
        },
        remove: (params: RemoveSubscriptionParams) => {
          const url = `${config.apiURL}/users/me/subscriptions`;
          return api<RemoveSubscriptionResponse>(url, config, 'DELETE', params);
        },
      },
      alertWords: {
        retrieve: () => {
          const url = `${config.apiURL}/users/me/alert_words`;
          return api<GetAlertWordsResponse>(url, config, 'GET');
        },
      },
    },
  };
}
