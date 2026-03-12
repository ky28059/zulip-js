import { GroupSettingValue } from './groups';

export enum StreamPostPolicy {
  Any = 1,
  Administrators = 2,
  FullMembers = 3,
  Moderators = 4,
}

export interface Stream {
  stream_id: number,
  name: string,
  description: string,
  rendered_description: string,
  date_created: number,
  creator_id?: number | null,
  invite_only: boolean,
  subscriber_count?: number,
  stream_weekly_traffic: number | null,
  is_archived?: boolean,
  is_web_public: boolean,
  is_announcement_only: boolean,
  is_recently_active?: boolean,
  // is_default?: boolean
  message_retention_days: number | null,
  history_public_to_subscribers: boolean,
  first_message_id?: number | null,
  folder_id?: number | null,
  stream_post_policy: StreamPostPolicy,
  topics_policy: 'inherit' | 'allow_empty_topic' | 'disable_empty_topic' | 'empty_topic_only',
  can_add_subscribers_group: GroupSettingValue,
  can_remove_subscribers_group: GroupSettingValue,
  can_administer_channel_group?: GroupSettingValue,
  can_delete_any_message_group?: GroupSettingValue,
  can_delete_own_message_group?: GroupSettingValue,
  can_move_messages_out_of_channel_group?: GroupSettingValue,
  can_move_messages_within_channel_group?: GroupSettingValue,
  can_send_message_group?: GroupSettingValue,
  can_subscribe_group?: GroupSettingValue,
  can_resolve_topics_group?: GroupSettingValue,
  can_create_topic_group?: GroupSettingValue,
}

export interface Subscription extends Stream {
  color: string,
  pin_to_top: boolean,
  subscribers?: number[],
  partial_subscribers?: number[],
  desktop_notifications: boolean | null,
  audible_notifications: boolean | null,
  push_notifications: boolean | null,
  email_notifications: boolean | null,
  wildcard_mentions_notify: boolean | null,
  in_home_view: boolean,
  is_muted: boolean,
}

export interface StreamTopic {
  name: string,
  max_id: number,
}
