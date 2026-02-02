import type { ZulipRC } from '../zuliprc';
import api from '../api';

export interface AddReactionParams {
  message_id: number,
  emoji_name: string,
  emoji_code?: string,
  reaction_type?: 'unicode_emoji' | 'realm_emoji' | 'zulip_extra_emoji'
}

export interface RemoveReactionParams {
  message_id: number,
  emoji_name?: string,
  emoji_code?: string,
  reaction_type?: 'unicode_emoji' | 'realm_emoji' | 'zulip_extra_emoji'
}

// TODO: abstract this with `api`?
export interface ReactionResponse {
  result: string,
  msg: string,
  code?: string
}

export default function reactions(config: ZulipRC) {
  const call = (
    method: 'POST' | 'DELETE',
    initParams: AddReactionParams | RemoveReactionParams,
  ): Promise<ReactionResponse> => {
    const { message_id, ...params } = initParams;
    return api(
      `${config.apiURL}/messages/${message_id}/reactions`,
      config,
      method,
      params,
    );
  };
  return {
    add: (params: AddReactionParams): Promise<ReactionResponse> => call('POST', params),
    remove: (params: RemoveReactionParams): Promise<ReactionResponse> => call('DELETE', params),
  };
}
