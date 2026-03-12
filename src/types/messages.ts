export interface Message {
  avatar_url: string | null,
  client: string,
  content: string,
  content_type: string,
  display_recipient: string | {
    id: number,
    email: string,
    full_name: string,
    is_mirror_dummy: boolean
  }[],
  edit_history?: {
    user_id: number | null, // TODO: only nullable before 2017?
    timestamp: number,
    prev_content?: string,
    prev_rendered_content?: string,
    prev_stream?: number,
    prev_topic?: string,
    stream?: number,
    topic?: string,
  }[],
  id: number,
  is_me_message: boolean,
  last_edit_timestamp?: number,
  last_moved_timestamp?: number,
  reactions: {
    emoji_name: string,
    emoji_code: string,
    reaction_type: 'unicode_emoji' | 'realm_emoji' | 'zulip_extra_emoji',
    user_id: number
  }[],
  recipient_id: number,
  sender_email: string,
  sender_full_name: string,
  sender_id: number,
  sender_realm_str: string,
  stream_id?: number,
  subject: string,
  submessages: {
    msg_type: string,
    content: string,
    message_id: number,
    sender_id: number,
    id: number,
  }[],
  timestamp: number,
  topic_links: {
    text: string,
    url: string
  }[]
  type: 'stream' | 'private',
}

// {@Link https://zulip.com/api/update-message-flags#available-flags}
export type MessageFlag = 'read'
  | 'starred'
  | 'collapsed'
  | 'mentioned'
  | 'stream_wildcard_mentioned'
  | 'topic_wildcard_mentioned'
  | 'has_alert_word'
  | 'historical'
  | 'wildcard_mentioned' // deprecated
