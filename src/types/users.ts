export enum BotType {
  Generic = 1,
  IncomingWebhook = 2,
  OutgoingWebhook = 3,
  Embedded = 4
}

export enum UserRole {
  Owner = 100,
  Administrator = 200,
  Moderator = 300,
  Member = 400,
  Guest = 600
}

export interface User {
  user_id: number,
  delivery_email?: string | null,
  email: string,
  full_name: string,
  date_joined: string,
  is_active: boolean,
  is_owner: boolean,
  is_admin: boolean,
  is_guest: boolean,
  is_bot: boolean,
  bot_type: BotType | null,
  bot_owner_id: number | null,
  role: UserRole,
  timezone: string,
  avatar_url: string | null,
  avatar_version: number,
  is_imported_stub?: boolean,
  profile_data?: Record<string, {
    value: string,
    rendered_value?: string
  }>
}
