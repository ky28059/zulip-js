import type { ZulipRC } from '../zuliprc';
import api from '../api';

export default function server(config: ZulipRC) {
  return {
    settings: (params: any) => {
      const url = `${config.apiURL}/server_settings`;
      return api(url, config, 'GET', params);
    },
  };
}
