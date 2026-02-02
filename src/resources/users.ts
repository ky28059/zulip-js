import type { ZulipRC } from '../zuliprc';
import api from '../api';

export default function users(config: ZulipRC) {
  return {
    retrieve: (params: any) => {
      const url = `${config.apiURL}/users`;
      return api(url, config, 'GET', params);
    },
    create: (params: any) => {
      const url = `${config.apiURL}/users`;
      return api(url, config, 'POST', params);
    },
    me: {
      pointer: {
        retrieve: (params: any) => {
          const url = `${config.apiURL}/users/me/pointer`;
          return api(url, config, 'GET', params);
        },
        update: (id: number) => {
          const url = `${config.apiURL}/users/me/pointer`;
          return api(url, config, 'POST', { pointer: id });
        },
      },
      getProfile: () => {
        const url = `${config.apiURL}/users/me`;
        return api(url, config, 'GET');
      },
      subscriptions: {
        add: (params: any) => {
          const url = `${config.apiURL}/users/me/subscriptions`;
          return api(url, config, 'POST', params);
        },
        remove: (params: any) => {
          const url = `${config.apiURL}/users/me/subscriptions`;
          return api(url, config, 'DELETE', params);
        },
      },
      alertWords: {
        retrieve: (params: any) => {
          const url = `${config.apiURL}/users/me/alert_words`;
          return api(url, config, 'GET', params);
        },
      },
    },
  };
}
