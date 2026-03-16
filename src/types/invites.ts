import type { UserRole } from './users';

export interface Invite {
  id: number,
  invited_by_user_id: number,
  invited: number,
  expiry_date: number | null,
  invited_as: UserRole,
  is_multiuse: boolean,
  email?: string,
  link_url?: string,
  notify_referrer_on_join: boolean
}
