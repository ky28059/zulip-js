import parseConfigFile, { ZulipRC } from './zuliprc';

import api from './api';

import accounts from './resources/accounts';
import streams from './resources/streams';
import messages from './resources/messages';
import queues from './resources/queues';
import events from './resources/events';
import users from './resources/users';
import emojis from './resources/emojis';
import typing from './resources/typing';
import reactions from './resources/reactions';
import server from './resources/server';
import filters from './resources/filters';
import eventsWapper from './events_wrapper';

function getCallEndpoint(config: ZulipRC) {
  return function callEndpoint(
    endpoint: string,
    method: 'GET' | 'POST' | 'DELETE' | 'PATCH' = 'GET',
    params = {},
  ): Promise<any> {
    const myConfig = { ...config };
    let finalendpoint = endpoint;
    if (!endpoint.startsWith('/')) {
      finalendpoint = `/${endpoint}`;
    }
    const url = myConfig.apiURL + finalendpoint;
    return api(url, myConfig, method, params);
  };
}

function resources(config: ZulipRC) {
  return {
    config,
    callEndpoint: getCallEndpoint(config),
    accounts: accounts(config),
    streams: streams(config),
    messages: messages(config),
    queues: queues(config),
    events: events(config),
    users: users(config),
    emojis: emojis(config),
    typing: typing(config),
    reactions: reactions(config),
    server: server(config),
    filters: filters(config),
    callOnEachEvent: eventsWapper(config),
  };
}

type InitOptions = {
  zuliprc: string
} | {
  realm: string,
  username: string,
  apiKey: string
} | {
  realm: string,
  username: string,
  password: string
}

export default async function zulip(initialConfig: InitOptions) {
  if ('zuliprc' in initialConfig) {
    return resources(await parseConfigFile(initialConfig.zuliprc));
  }

  const realm = initialConfig.realm;
  const apiURL = realm.endsWith('/api')
    ? `${realm}/v1`
    : `${realm}/api/v1`;

  let apiKey;
  if (!('apiKey' in initialConfig)) {
    const res = await accounts(initialConfig as any).retrieve();
    apiKey = res.api_key;
  } else {
    apiKey = initialConfig.apiKey;
  }

  return resources({
    realm,
    apiURL,
    username: initialConfig.username,
    apiKey,
  });
}
