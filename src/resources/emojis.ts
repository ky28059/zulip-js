import type { ZulipRC } from '../zuliprc';
import api from '../api';

export interface EmojiDetail {
  id: string,
  name: string,
  source_url: string,
  still_url?: string | null,
  deactivated: boolean,
  author_id?: number | null
}

// {@Link https://zulip.com/api/get-custom-emoji}
export interface RetrieveEmojisResponse {
  emoji: Record<string, EmojiDetail>
}

// {@Link https://zulip.com/api/deactivate-custom-emoji}
export interface DeactivateEmojiParams {
  emoji_name: string
}

export default function emojis(config: ZulipRC) {
  return {
    retrieve: () => {
      return api<RetrieveEmojisResponse>('/realm/emoji', config, 'GET');
    },
    deactivate: (params: string | DeactivateEmojiParams) => {
      const name = typeof params === 'string' ? params : params.emoji_name;
      return api<{}>(`/realm/emoji/${name}`, config, 'DELETE');
    }
  };
}
