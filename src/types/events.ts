import type { Attachment } from './attachments';
import type { Draft } from './drafts';
import type { Message, MessageFlag } from './messages';

export interface EventBase {
  id: number
}

export interface AlertWordsEvent extends EventBase {
  type: 'alert_words',
  alert_words: string[]
}

export interface AttachmentAddEvent extends EventBase {
  type: 'attachment'
  op: 'add'
  upload_space_used: number,
  attachment: Attachment
}

export interface AttachmentUpdateEvent extends EventBase {
  type: 'attachment',
  op: 'update',
  upload_space_used: number,
  attachment: Attachment
}

export interface AttachmentRemoveEvent extends EventBase {
  type: 'attachment',
  op: 'remove',
  upload_space_used: number,
  attachment: {
    id: number
  }
}

export type AttachmentEvent = AttachmentAddEvent | AttachmentRemoveEvent | AttachmentUpdateEvent;

export interface ChannelFolderAddEvent extends EventBase {
  type: 'channel_folder',
  op: 'add',
  channel_folder: {
    id: number,
    name: string,
    order?: number,
    date_created: number | null,
    creator_id: number | null,
    description: string,
    rendered_description: string,
    is_archived: boolean
  }
}

export interface ChannelFolderReorderEvent extends EventBase {
  type: 'channel_folder',
  op: 'reorder',
  order: number[]
}

export interface ChannelFolderUpdateEvent extends EventBase {
  type: 'channel_folder',
  op: 'update',
  channel_folder_id: number,
  data: {
    name?: string,
    description?: string,
    rendered_description?: string,
    is_archived?: boolean
  }
}

export type ChannelFolderEvent = ChannelFolderAddEvent | ChannelFolderReorderEvent | ChannelFolderUpdateEvent;

export interface CustomProfileFieldsEvent extends EventBase {
  type: 'custom_profile_fields',
  fields: {
    id: number,
    type: number, // TODO: enum?
    order: number,
    name: string,
    hint: string,
    field_data: string,
    display_in_profile_summary?: boolean,
    required?: boolean,
    editable_by_user?: boolean,
  }[]
}

export interface DefaultStreamGroupsEvent extends EventBase {
  type: 'default_stream_groups',
  default_stream_groups: {
    name: string,
    description: string,
    id: number,
    streams: number[] // TODO: dicts before 10.0?
  }[]
}

export interface DefaultStreamsEvent extends EventBase {
  type: 'default_streams',
  default_streams: number[] // TODO: dicts before 10.0? -> { stream_id: number, name: string }
}

export interface DeleteMessageEvent extends EventBase {
  type: 'delete_message',
  message_ids?: number[],
  message_id?: number,
  message_type: 'stream' | 'private',
  stream_id?: number,
  topic?: string
}

export interface DraftsAddEvent extends EventBase {
  type: 'drafts',
  op: 'add',
  drafts: Draft[]
}

export interface DraftsRemoveEvent extends EventBase {
  type: 'drafts',
  op: 'remove',
  draft_id: number
}

export interface DraftsUpdateEvent extends EventBase {
  type: 'drafts',
  op: 'update',
  draft: Draft
}

export type DraftsEvent = DraftsAddEvent | DraftsRemoveEvent | DraftsUpdateEvent;

export interface HasZoomTokenEvent extends EventBase {
  type: 'has_zoom_token',
  value: boolean
}

export interface HeartbeatEvent extends EventBase {
  type: 'heartbeat'
}

export interface InvitesChangedEvent extends EventBase {
  type: 'invites_changed'
}

export interface MessageEvent extends EventBase {
  type: 'message',
  message: Message,
  flags: MessageFlag[]
}

export interface MutedTopicsEvent extends EventBase {
  type: 'muted_topics',
  muted_topics: [channel: string, topic: string, ts: number][]
}

export interface MutedUsersEvent extends EventBase {
  type: 'muted_users',
  muted_users: { id: number, timestamp: number }[]
}

export interface NavigationViewAddEvent extends EventBase {
  type: 'navigation_view',
  op: 'add',
  navigation_view: {
    fragment: string,
    is_pinned: boolean,
    name: string | null
  }
}
// ------

export interface NavigationViewRemoveEvent extends EventBase {
  type: 'navigation_view',
  op: 'remove',
  [key: string]: any
}

export interface NavigationViewUpdateEvent extends EventBase {
  type: 'navigation_view',
  op: 'update',
  [key: string]: any
}

export type NavigationViewEvent = NavigationViewAddEvent | NavigationViewRemoveEvent | NavigationViewUpdateEvent;

export interface OnboardingStepsEvent extends EventBase {
  type: 'onboarding_steps',
  onboarding_steps: { name: string, type: string }[]
}

export interface PresenceEvent extends EventBase {
  type: 'presence',
  email: string,
  server_timestamp: number,
  presence: {
    [client_name: string]: {
      status: 'active' | 'idle' | 'offline',
      timestamp: number,
      client: string,
      pushable: boolean
    }
  }
}

export interface PushDeviceEvent extends EventBase {
  type: 'push_device'
}

export interface ReactionAddEvent extends EventBase {
  type: 'reaction',
  op: 'add',
  user_id: number,
  message_id: number,
  emoji_name: string,
  emoji_code: string,
  reaction_type: 'unicode_emoji' | 'realm_emoji' | 'zulip_extra_emoji'
}

export interface ReactionRemoveEvent extends EventBase {
  type: 'reaction',
  op: 'remove',
  user_id: number,
  message_id: number,
  emoji_name: string,
  emoji_code: string,
  reaction_type: 'unicode_emoji' | 'realm_emoji' | 'zulip_extra_emoji'
}

export type ReactionEvent = ReactionAddEvent | ReactionRemoveEvent;

export interface RealmDeactivatedEvent extends EventBase {
  type: 'realm',
  op: 'deactivated'
}

export interface RealmUpdateEvent extends EventBase {
  type: 'realm',
  op: 'update',
  property: string,
  value: any,
  extra_data?: any
}

export interface RealmUpdateDictEvent extends EventBase {
  type: 'realm',
  op: 'update_dict',
  property: string,
  data: any
}

export type RealmEvent = RealmDeactivatedEvent | RealmUpdateEvent | RealmUpdateDictEvent;

export interface RealmBotAddEvent extends EventBase {
  type: 'realm_bot',
  op: 'add',
  bot: any
}

export interface RealmBotDeleteEvent extends EventBase {
  type: 'realm_bot',
  op: 'delete',
  bot: { email: string, user_id: number }
}

export interface RealmBotRemoveEvent extends EventBase {
  type: 'realm_bot',
  op: 'remove', // Legacy synonym for delete?
  bot: { email: string, user_id: number }
}

export interface RealmBotUpdateEvent extends EventBase {
  type: 'realm_bot',
  op: 'update',
  bot: any
}

export type RealmBotEvent = RealmBotAddEvent | RealmBotDeleteEvent | RealmBotRemoveEvent | RealmBotUpdateEvent;

export interface RealmDomainsAddEvent extends EventBase {
  type: 'realm_domains',
  op: 'add',
  realm_domain: {
    domain: string,
    allow_subdomains: boolean
  }
}

export interface RealmDomainsChangeEvent extends EventBase {
  type: 'realm_domains',
  op: 'change',
  realm_domain: {
    domain: string,
    allow_subdomains: boolean
  }
}

export interface RealmDomainsRemoveEvent extends EventBase {
  type: 'realm_domains',
  op: 'remove',
  domain: string
}

export type RealmDomainsEvent = RealmDomainsAddEvent | RealmDomainsChangeEvent | RealmDomainsRemoveEvent;

export interface RealmEmojiEvent extends EventBase {
  type: 'realm_emoji',
  op: 'update',
  realm_emoji: {[key: string]: any}
}

export interface RealmExportEvent extends EventBase {
  type: 'realm_export',
  exports: any[]
}

export interface RealmExportConsentEvent extends EventBase {
  type: 'realm_export_consent',
  user_id: number,
  consented: boolean
}

export interface RealmFiltersEvent extends EventBase {
  type: 'realm_filters',
  realm_filters: [string, string, number][]
}

export interface RealmLinkifiersEvent extends EventBase {
  type: 'realm_linkifiers',
  realm_linkifiers: {
    pattern: string,
    url_format: string,
    id: number
  }[]
}

export interface RealmPlaygroundsEvent extends EventBase {
  type: 'realm_playgrounds',
  realm_playgrounds: {
    id: number,
    name: string,
    pygments_language: string,
    url_prefix: string
  }[]
}

export interface RealmUserUpdateEvent extends EventBase {
  type: 'realm_user',
  op: 'update',
  person: {
    user_id: number,
    [key: string]: any
  }
}

export interface RealmUserAddEvent extends EventBase {
  type: 'realm_user',
  op: 'add',
  person: {
    user_id: number,
    email: string,
    full_name: string,
    [key: string]: any
  }
}

export interface RealmUserRemoveEvent extends EventBase {
  type: 'realm_user',
  op: 'remove',
  person: {
    user_id: number,
    full_name: string
  }
}

export type RealmUserEvent = RealmUserUpdateEvent | RealmUserAddEvent | RealmUserRemoveEvent;

export interface RealmUserSettingsDefaultsEvent extends EventBase {
  type: 'realm_user_settings_defaults',
  op: 'update',
  property: string,
  value: any
}

export interface RemindersAddEvent extends EventBase {
  type: 'reminders',
  op: 'add'
  // TODO: Add details
}

export interface RemindersRemoveEvent extends EventBase {
  type: 'reminders',
  op: 'remove'
  // TODO: Add details
}

export type RemindersEvent = RemindersAddEvent | RemindersRemoveEvent;

export interface RestartEvent extends EventBase {
  type: 'restart'
}

export interface SavedSnippetsAddEvent extends EventBase {
  type: 'saved_snippets',
  op: 'add'
  // TODO: Add details
}

export interface SavedSnippetsRemoveEvent extends EventBase {
  type: 'saved_snippets',
  op: 'remove'
  // TODO: Add details
}

export interface SavedSnippetsUpdateEvent extends EventBase {
  type: 'saved_snippets',
  op: 'update'
  // TODO: Add details
}

export type SavedSnippetsEvent = SavedSnippetsAddEvent | SavedSnippetsRemoveEvent | SavedSnippetsUpdateEvent;

export interface ScheduledMessagesAddEvent extends EventBase {
  type: 'scheduled_messages',
  op: 'add',
  scheduled_messages: {
    scheduled_message_id: number,
    type: 'stream' | 'private',
    to: number[],
    topic: string,
    content: string,
    rendered_content: string,
    scheduled_delivery_timestamp: number
  }[]
}

export interface ScheduledMessagesRemoveEvent extends EventBase {
  type: 'scheduled_messages',
  op: 'remove',
  scheduled_message_id: number
}

export interface ScheduledMessagesUpdateEvent extends EventBase {
  type: 'scheduled_messages',
  op: 'update',
  scheduled_message: {
    scheduled_message_id: number,
    type: 'stream' | 'private',
    to: number[],
    topic: string,
    content: string,
    rendered_content: string,
    scheduled_delivery_timestamp: number
  }
}

export type ScheduledMessagesEvent = ScheduledMessagesAddEvent | ScheduledMessagesRemoveEvent | ScheduledMessagesUpdateEvent;

export interface StreamCreateEvent extends EventBase {
  type: 'stream',
  op: 'create',
  streams: any[]
}

export interface StreamDeleteEvent extends EventBase {
  type: 'stream',
  op: 'delete',
  streams: any[]
}

export interface StreamUpdateEvent extends EventBase {
  type: 'stream',
  op: 'update',
  stream_id: number,
  name: string,
  property: string,
  value: any
}

export type StreamEvent = StreamCreateEvent | StreamDeleteEvent | StreamUpdateEvent;

export interface SubmessageEvent extends EventBase {
  type: 'submessage',
  submessage_id: number,
  message_id: number,
  sender_id: number,
  msg_type: 'widget',
  content: string
}

export interface GroupSettingValue {
  direct_members: number[],
  direct_subgroups: number[]
}

export interface SubscriptionObject {
  stream_id: number,
  name: string,
  description: string,
  rendered_description: string,
  date_created?: number,
  creator_id: number | null,
  invite_only: boolean,
  subscribers?: number[],
  partial_subscribers?: number[],
  desktop_notifications: boolean | null,
  email_notifications: boolean | null,
  wildcard_mentions_notify: boolean | null,
  push_notifications: boolean | null,
  audible_notifications: boolean | null,
  pin_to_top: boolean,
  is_muted: boolean,
  in_home_view?: boolean, // Deprecated
  is_announcement_only?: boolean, // Deprecated
  is_web_public: boolean,
  color: string,
  stream_post_policy?: number, // Deprecated
  message_retention_days: number | null,
  history_public_to_subscribers: boolean,
  first_message_id: number | null,
  folder_id: number | null,
  topics_policy: string,
  is_recently_active: boolean,
  stream_weekly_traffic: number | null,
  can_add_subscribers_group: number | GroupSettingValue,
  can_remove_subscribers_group: number | GroupSettingValue,
  can_administer_channel_group: number | GroupSettingValue,
  can_delete_any_message_group: number | GroupSettingValue,
  can_delete_own_message_group: number | GroupSettingValue,
  can_move_messages_out_of_channel_group: number | GroupSettingValue,
  can_move_messages_within_channel_group: number | GroupSettingValue,
  can_send_message_group: number | GroupSettingValue,
  can_subscribe_group: number | GroupSettingValue,
  can_resolve_topics_group: number | GroupSettingValue,
  can_create_topic_group: number | GroupSettingValue,
  is_archived: boolean,
  subscriber_count: number
}

export interface SubscriptionAddEvent extends EventBase {
  type: 'subscription',
  op: 'add',
  subscriptions: SubscriptionObject[]
}

export interface SubscriptionRemoveObject {
  stream_id: number,
  name: string
}

export interface SubscriptionRemoveEvent extends EventBase {
  type: 'subscription',
  op: 'remove',
  subscriptions: SubscriptionRemoveObject[]
}

export interface SubscriptionUpdateEvent extends EventBase {
  type: 'subscription',
  op: 'update',
  stream_id: number,
  property: string,
  value: number | boolean | string
}

export interface SubscriptionPeerAddEvent extends EventBase {
  type: 'subscription',
  op: 'peer_add',
  stream_ids: number[],
  user_ids: number[]
}

export interface SubscriptionPeerRemoveEvent extends EventBase {
  type: 'subscription',
  op: 'peer_remove',
  stream_ids: number[],
  user_ids: number[]
}

export type SubscriptionEvent = SubscriptionAddEvent | SubscriptionRemoveEvent | SubscriptionUpdateEvent | SubscriptionPeerAddEvent | SubscriptionPeerRemoveEvent;

export interface TypingStartEvent extends EventBase {
  type: 'typing',
  op: 'start',
  sender: {
    user_id: number,
    email: string
  },
  recipients: {
    user_id: number,
    email: string
  }[]
}

export interface TypingStopEvent extends EventBase {
  type: 'typing',
  op: 'stop',
  sender: {
    user_id: number,
    email: string
  },
  recipients: {
    user_id: number,
    email: string
  }[]
}

export type TypingEvent = TypingStartEvent | TypingStopEvent;

export interface TypingEditMessageStartEvent extends EventBase {
  type: 'typing_edit_message',
  op: 'start'
  // TODO: Add details
}

export interface TypingEditMessageStopEvent extends EventBase {
  type: 'typing_edit_message',
  op: 'stop'
  // TODO: Add details
}

export type TypingEditMessageEvent = TypingEditMessageStartEvent | TypingEditMessageStopEvent;

export interface UpdateMessageEvent extends EventBase {
  type: 'update_message',
  message_id: number,
  message_ids: number[],
  flags: string[],
  edit_timestamp?: number,
  stream_name?: string,
  stream_id?: number,
  new_stream_id?: number,
  propagate_mode?: 'change_one' | 'change_all' | 'change_later',
  orig_subject?: string,
  subject?: string,
  topic?: string,
  orig_content?: string,
  content?: string,
  rendered_content?: string,
  is_me_message?: boolean
}

export interface UpdateMessageFlagsAddEvent extends EventBase {
  type: 'update_message_flags',
  op: 'add',
  flag: string,
  messages: number[],
  all: boolean
}

export interface UpdateMessageFlagsRemoveEvent extends EventBase {
  type: 'update_message_flags',
  op: 'remove',
  flag: string,
  messages: number[],
  all: boolean
}

export type UpdateMessageFlagsEvent = UpdateMessageFlagsAddEvent | UpdateMessageFlagsRemoveEvent;

export interface UserGroupAddEvent extends EventBase {
  type: 'user_group',
  op: 'add',
  group: any
}

export interface UserGroupAddMembersEvent extends EventBase {
  type: 'user_group',
  op: 'add_members',
  group_id: number,
  user_ids: number[]
}

export interface UserGroupAddSubgroupsEvent extends EventBase {
  type: 'user_group',
  op: 'add_subgroups',
  group_id: number,
  direct_subgroup_ids: number[]
}

export interface UserGroupRemoveEvent extends EventBase {
  type: 'user_group',
  op: 'remove',
  group_id: number
}

export interface UserGroupRemoveMembersEvent extends EventBase {
  type: 'user_group',
  op: 'remove_members',
  group_id: number,
  user_ids: number[]
}

export interface UserGroupRemoveSubgroupsEvent extends EventBase {
  type: 'user_group',
  op: 'remove_subgroups',
  group_id: number,
  direct_subgroup_ids: number[]
}

export interface UserGroupUpdateEvent extends EventBase {
  type: 'user_group',
  op: 'update',
  group_id: number,
  data: {
    name?: string,
    description?: string
  }
}

export type UserGroupEvent = UserGroupAddEvent | UserGroupAddMembersEvent | UserGroupAddSubgroupsEvent | UserGroupRemoveEvent | UserGroupRemoveMembersEvent | UserGroupRemoveSubgroupsEvent | UserGroupUpdateEvent;

export interface UserStatusEvent extends EventBase {
  type: 'user_status',
  user_id: number,
  status_text?: string,
  emoji_name?: string,
  emoji_code?: string,
  reaction_type?: string
}

export interface UserTopicEvent extends EventBase {
  type: 'user_topic',
  stream_id: number,
  topic_name: string,
  last_updated: number,
  visibility_policy: number
}

export interface WebReloadClientEvent extends EventBase {
  type: 'web_reload_client',
  immediate: boolean
}

export interface UserSettingsEvent extends EventBase {
  type: 'user_settings',
  op: 'update',
  property: string,
  value: any
}

export type ZulipEvent =
  | AlertWordsEvent
  | AttachmentEvent
  | ChannelFolderEvent
  | CustomProfileFieldsEvent
  | DefaultStreamGroupsEvent
  | DefaultStreamsEvent
  | DeleteMessageEvent
  | DraftsEvent
  | HasZoomTokenEvent
  | HeartbeatEvent
  | InvitesChangedEvent
  | MessageEvent
  | MutedTopicsEvent
  | MutedUsersEvent
  | NavigationViewEvent
  | OnboardingStepsEvent
  | PresenceEvent
  | PushDeviceEvent
  | ReactionEvent
  | RealmEvent
  | RealmBotEvent
  | RealmDomainsEvent
  | RealmEmojiEvent
  | RealmExportEvent
  | RealmExportConsentEvent
  | RealmFiltersEvent
  | RealmLinkifiersEvent
  | RealmPlaygroundsEvent
  | RealmUserEvent
  | RealmUserSettingsDefaultsEvent
  | RemindersEvent
  | RestartEvent
  | SavedSnippetsEvent
  | ScheduledMessagesEvent
  | StreamEvent
  | SubmessageEvent
  | SubscriptionEvent
  | TypingEvent
  | TypingEditMessageEvent
  | UpdateMessageEvent
  | UpdateMessageFlagsEvent
  | UserGroupEvent
  | UserStatusEvent
  | UserTopicEvent
  | WebReloadClientEvent
  | UserSettingsEvent;

export type Events = {
  alert_words: AlertWordsEvent,
  attachment: AttachmentEvent,
  channel_folder: ChannelFolderEvent,
  custom_profile_fields: CustomProfileFieldsEvent,
  default_stream_groups: DefaultStreamGroupsEvent,
  default_streams: DefaultStreamsEvent,
  delete_message: DeleteMessageEvent,
  drafts: DraftsEvent,
  has_zoom_token: HasZoomTokenEvent,
  heartbeat: HeartbeatEvent,
  invites_changed: InvitesChangedEvent,
  message: MessageEvent,
  muted_topics: MutedTopicsEvent,
  muted_users: MutedUsersEvent,
  navigation_view: NavigationViewEvent,
  onboarding_steps: OnboardingStepsEvent,
  presence: PresenceEvent,
  push_device: PushDeviceEvent,
  reaction: ReactionEvent,
  realm: RealmEvent,
  realm_bot: RealmBotEvent,
  realm_domains: RealmDomainsEvent,
  realm_emoji: RealmEmojiEvent,
  realm_export: RealmExportEvent,
  realm_export_consent: RealmExportConsentEvent,
  realm_filters: RealmFiltersEvent,
  realm_linkifiers: RealmLinkifiersEvent,
  realm_playgrounds: RealmPlaygroundsEvent,
  realm_user: RealmUserEvent,
  realm_user_settings_defaults: RealmUserSettingsDefaultsEvent,
  reminders: RemindersEvent,
  restart: RestartEvent,
  saved_snippets: SavedSnippetsEvent,
  scheduled_messages: ScheduledMessagesEvent,
  stream: StreamEvent,
  submessage: SubmessageEvent,
  subscription: SubscriptionEvent,
  typing: TypingEvent,
  typing_edit_message: TypingEditMessageEvent,
  update_message: UpdateMessageEvent,
  update_message_flags: UpdateMessageFlagsEvent,
  user_group: UserGroupEvent,
  user_status: UserStatusEvent,
  user_topic: UserTopicEvent,
  web_reload_client: WebReloadClientEvent,
  user_settings: UserSettingsEvent
};
