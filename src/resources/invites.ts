import type { ZulipRC } from '../zuliprc';
import type { Invite } from '../types/invites';
import type { UserRole } from '../types/users';
import api from '../api';

// {@Link https://zulip.com/api/get-invites}
export interface GetInvitesResponse {
  invites: Invite[]
}

// {@Link https://zulip.com/api/send-invites}
export interface SendInvitesParams {
  invitee_emails: string,
  stream_ids: number[],
  invite_expires_in_minutes?: number | null,
  invite_as?: UserRole,
  group_ids?: number[],
  include_realm_default_subscriptions?: boolean,
  notify_referrer_on_join?: boolean,
  welcome_message_custom_text?: string | null
}

export interface SendInvitesResponse {
  sent_invitations?: boolean, // TODO: these only appear on error responses
  license_limit_reached?: boolean,
  daily_limit_reached?: boolean,
  errors?: [string, string, boolean][],
}

// {@Link https://zulip.com/api/resend-email-invite}
export interface ResendInviteParams {
  invite_id: number
}

// {@Link https://zulip.com/api/revoke-email-invite}
export interface RevokeInviteParams {
  invite_id: number
}

// {@Link https://zulip.com/api/create-invite-link}
export interface CreateMultiuseInviteParams {
  invite_expires_in_minutes?: number | null,
  invite_as?: UserRole,
  stream_ids?: number[],
  group_ids?: number[],
  include_realm_default_subscriptions?: boolean,
  welcome_message_custom_text?: string | null
}

export interface CreateMultiuseInviteResponse {
  invite_link: string
}

// {@Link https://zulip.com/api/revoke-invite-link}
export interface RevokeMultiuseInviteParams {
  invite_id: number
}

export default function invites(config: ZulipRC) {
  return {
    retrieve: () => {
      return api<GetInvitesResponse>('/invites', config, 'GET');
    },
    send: (params: SendInvitesParams) => {
      return api<SendInvitesResponse>('/invites', config, 'POST', params);
    },
    resend: (params: ResendInviteParams) => {
      const url = `/invites/${params.invite_id}/resend`;
      return api<{}>(url, config, 'POST');
    },
    revoke: (params: RevokeInviteParams) => {
      const url = `/invites/${params.invite_id}`;
      return api<{}>(url, config, 'DELETE');
    },
    multiuse: {
      create: (params: CreateMultiuseInviteParams) => {
        return api<CreateMultiuseInviteResponse>('/invites/multiuse', config, 'POST', params);
      },
      revoke: (params: RevokeMultiuseInviteParams) => {
        const url = `/invites/multiuse/${params.invite_id}`;
        return api<{}>(url, config, 'DELETE');
      },
    },
  };
}
