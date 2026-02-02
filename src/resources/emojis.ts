import type { ZulipRC } from '../zuliprc';
import api from '../api';

export default function emojis(config: ZulipRC) {
  return {
    retrieve: (params: any) => {
      const url = `${config.apiURL}/realm/emoji`;
      return api(url, config, 'GET', params);
    },
  };
}
