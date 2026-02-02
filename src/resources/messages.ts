import type { ZulipRC } from '../zuliprc';
import api from '../api';

export default function messages(config: ZulipRC) {
  const baseURL = `${config.apiURL}/messages`;
  const flagsURL = `${baseURL}/flags`;
  return {
    retrieve: (initialParams: any) => {
      const url = `${config.apiURL}/messages`;
      const params = { ...initialParams };
      if (params.narrow) {
        params.narrow = JSON.stringify(params.narrow);
      }
      return api(url, config, 'GET', params);
    },
    send: (params: any) => {
      const url = `${config.apiURL}/messages`;
      return api(url, config, 'POST', params);
    },
    render: (initialParams: any) => {
      const url = `${config.apiURL}/messages/render`;
      let params = { ...initialParams };
      if (typeof initialParams === 'string') {
        params = {
          content: initialParams,
        };
      }
      return api(url, config, 'POST', params);
    },
    update: (params: any) => {
      const url = `${config.apiURL}/messages/${params.message_id}`;
      return api(url, config, 'PATCH', params);
    },
    flags: {
      add: (initialParams: any) => {
        // params.flag can be one of 'read', 'starred', 'mentioned',
        // 'wildcard_mentioned', 'has_alert_word', 'historical',
        const params = { ...initialParams };
        params.op = 'add';
        if (params.messages) {
          params.messages = JSON.stringify(params.messages);
        }
        return api(flagsURL, config, 'POST', params);
      },
      remove: (initialParams: any) => {
        // params.flag can be one of 'read', 'starred', 'mentioned',
        // 'wildcard_mentioned', 'has_alert_word', 'historical',
        const params = { ...initialParams };
        params.op = 'remove';
        if (params.messages) {
          params.messages = JSON.stringify(params.messages);
        }
        return api(flagsURL, config, 'POST', params);
      },
    },
    getById: (params: any) => {
      const url = `${config.apiURL}/messages/${params.message_id}`;
      return api(url, config, 'GET', params);
    },
    getHistoryById: (params: any) => {
      const url = `${config.apiURL}/messages/${params.message_id}/history`;
      return api(url, config, 'GET', params);
    },
    deleteReactionById: (params: any) => {
      const url = `${config.apiURL}/messages/${params.message_id}/reactions`;
      return api(url, config, 'DELETE', params);
    },
    deleteById: (params: any) => {
      const url = `${config.apiURL}/messages/${params.message_id}`;
      return api(url, config, 'DELETE', params);
    },
  };
}
