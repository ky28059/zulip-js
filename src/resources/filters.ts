import type { ZulipRC } from '../zuliprc';
import api from '../api';

export default function filters(config: ZulipRC) {
  return {
    retrieve: (params: any) => {
      return api('/realm/filters', config, 'GET', params);
    },
  };
}
