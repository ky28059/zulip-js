import type { ZulipRC } from '../zuliprc';
import api from '../api';
import type { Linkifier } from '../types/linkifiers';

// {@Link https://zulip.com/api/get-linkifiers}
export interface GetLinkifiersResponse {
  linkifiers: Linkifier[]
}

export default function linkifiers(config: ZulipRC) {
  return {
    retrieve: () => {
      return api<GetLinkifiersResponse>('/realm/linkifiers', config, 'GET');
    },
  };
}
