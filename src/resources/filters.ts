import type { ZulipRC } from '../zuliprc';
import api from '../api';

export default function filters(config: ZulipRC) {
  return {
    retrieve: (params: any) => {
      const url = `${config.apiURL}/realm/filters`;
      return api(url, config, 'GET', params);
    },
  };
}
