import type { ZulipRC } from '../zuliprc';
import api from '../api';

export interface ServerSettingsResponse {
  authentication_methods: {
    password: boolean,
    dev: boolean,
    email: boolean,
    ldap: boolean,
    remoteuser: boolean,
    github: boolean,
    azuread: boolean,
    gitlab: boolean,
    apple: boolean,
    google: boolean,
    saml: boolean,
    'openid connect': boolean,
  }, // deprecated?
  external_authentication_methods: {
    name: string;
    display_name: string;
    display_icon: string | null;
    login_url: string;
    signup_url: string;
  }[],
  zulip_feature_level: number,
  zulip_version: string,
  zulip_merge_base: string,
  push_notifications_enabled: boolean,
  is_incompatible: boolean,
  email_auth_enabled: boolean,
  require_email_format_usernames: boolean,
  realm_uri?: string, // deprecated?
  realm_url: string,
  realm_name: string,
  realm_icon: string,
  realm_description: string,
  realm_web_public_access_enabled?: boolean, // new?

  // TODO?
  result: string,
  msg: string,
}

export default function server(config: ZulipRC) {
  return {
    settings: (): Promise<ServerSettingsResponse> => {
      const url = `${config.apiURL}/server_settings`;
      return api(url, config, 'GET');
    },
  };
}
