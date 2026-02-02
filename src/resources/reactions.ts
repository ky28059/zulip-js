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
