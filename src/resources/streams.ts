import type { ZulipRC } from '../zuliprc';
import api from '../api';

export default function streams(config: ZulipRC) {
  return {
    retrieve: (params: any) => {
      const url = `${config.apiURL}/streams`;
      return api(url, config, 'GET', params);
    },
    getStreamId: (initialParams: any) => {
      const url = `${config.apiURL}/get_stream_id`;
      let params = { ...initialParams };
      if (typeof initialParams === 'string') {
        params = {
          stream: initialParams,
        };
      }
      return api(url, config, 'GET', params);
    },
    subscriptions: {
      retrieve: (params: any) => {
        const url = `${config.apiURL}/users/me/subscriptions`;
        return api(url, config, 'GET', params);
      },
    },
    topics: {
      retrieve: (params: any) => {
        const url = `${config.apiURL}/users/me/${params.stream_id}/topics`;
        return api(url, config, 'GET');
      },
    },
    deleteById: (params: any) => {
      const url = `${config.apiURL}/streams/${params.stream_id}`;
      return api(url, config, 'DELETE', params);
    },
  };
}
