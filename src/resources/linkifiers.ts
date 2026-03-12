import type { ZulipRC } from '../zuliprc';
import api from '../api';
import type { Linkifier } from '../types/linkifiers';

// {@Link https://zulip.com/api/get-linkifiers}
export interface GetLinkifiersResponse {
  linkifiers: Linkifier[]
}

// {@Link https://zulip.com/api/add-linkifier}
export interface AddLinkifierParams {
  pattern: string,
  url_template: string
}

export interface AddLinkifierResponse {
  id: number
}

// {@Link https://zulip.com/api/update-linkifier}
export interface UpdateLinkifierParams {
  pattern: string,
  url_template: string,
  filter_id: number
}

// {@Link https://zulip.com/api/remove-linkifier}
export interface RemoveLinkifierParams {
  filter_id: number
}

// {@Link https://zulip.com/api/reorder-linkifiers}
export interface ReorderLinkifiersParams {
  ordered_linkifier_ids: number[]
}

export default function linkifiers(config: ZulipRC) {
  return {
    retrieve: () => {
      return api<GetLinkifiersResponse>('/realm/linkifiers', config, 'GET');
    },
    add: (params: AddLinkifierParams) => {
      return api<AddLinkifierResponse>('/realm/filters', config, 'POST', params);
    },
    update: (initialParams: UpdateLinkifierParams) => {
      const { filter_id, ...params } = initialParams;
      return api<{}>(`/realm/filters/${filter_id}`, config, 'PATCH', params);
    },
    remove: (params: RemoveLinkifierParams | number) => {
      const filter_id = typeof params === 'number' ? params : params.filter_id;
      return api<{}>(`/realm/filters/${filter_id}`, config, 'DELETE');
    },
    reorder: (params: ReorderLinkifiersParams) => {
      return api<{}>('/realm/linkifiers', config, 'PATCH', params);
    },
  };
}
