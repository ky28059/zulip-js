import type { ZulipRC } from '../zuliprc';
import type { ReactionType } from '../types/reactions';
import api from '../api';

// {@Link https://zulip.com/api/add-reaction}
export interface AddReactionParams {
  message_id: number,
  emoji_name: string,
  emoji_code?: string,
  reaction_type?: ReactionType
}

// {@Link https://zulip.com/api/remove-reaction}
export interface RemoveReactionParams {
  message_id: number,
  emoji_name?: string,
  emoji_code?: string,
  reaction_type?: ReactionType
}

export default function reactions(config: ZulipRC) {
  const call = (
    method: 'POST' | 'DELETE',
    initParams: AddReactionParams | RemoveReactionParams,
  ) => {
    const { message_id, ...params } = initParams;
    return api<{}>(
      `${config.apiURL}/messages/${message_id}/reactions`,
      config,
      method,
      params,
    );
  };
  return {
    add: (params: AddReactionParams) => call('POST', params),
    remove: (params: RemoveReactionParams) => call('DELETE', params),
  };
}
