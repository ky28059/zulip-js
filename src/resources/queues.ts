import type { ZulipRC } from '../zuliprc';
import api from '../api';

interface RegisterQueuesParams {
  apply_markdown?: boolean,
  client_gravatar?: boolean,
  include_subscribers?: 'true' | 'false' | 'partial',
  slim_presence?: boolean,
  presence_history_limit_days?: number,
  event_types?: string[],
  all_public_streams?: boolean,
  client_capabilities?: any, // TODO
  fetch_event_types?: string[],
  narrow?: [string, string][] // TODO
}

interface DeregisterQueuesParams {
  queue_id: string
}

export default function queues(config: ZulipRC) {
  return {
    register: (initialParams: RegisterQueuesParams) => {
      const url = `${config.apiURL}/register`;
      const params = { ...initialParams };
      if (params.event_types) {
        params.event_types = JSON.stringify(params.event_types);
      }
      return api(url, config, 'POST', params);
    },
    deregister: (params: DeregisterQueuesParams) => {
      const url = `${config.apiURL}/events`;
      return api(url, config, 'DELETE', params);
    },
  };
}
