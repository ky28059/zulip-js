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

export interface RetrieveEmojisResponse {
  emoji: Record<string, EmojiDetail>,

  // TODO
  msg: string,
  result: string,
}

export default function emojis(config: ZulipRC) {
  return {
    retrieve: (): Promise<RetrieveEmojisResponse> => {
      const url = `${config.apiURL}/realm/emoji`;
      return api(url, config, 'GET');
    },
  };
}
