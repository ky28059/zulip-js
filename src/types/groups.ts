export interface UserGroup {
  id: number,
  name: string,
  description: string,
  members: number[],
  direct_subgroup_ids: number[],
  is_system_group: boolean,
  date_created: number | null,
  creator_id: number | null,
  deactivated?: boolean,
  can_add_members_group?: GroupSettingValue,
  can_remove_members_group?: GroupSettingValue,
  can_mention_group?: GroupSettingValue,
  can_manage_group?: GroupSettingValue,
  can_leave_group?: GroupSettingValue,
  can_join_group?: GroupSettingValue,
}

// {@Link https://zulip.com/api/group-setting-values#group-setting-values}
export type GroupSettingValue = number | {
  direct_members: number[],
  direct_subgroups: number[]
}

// {@Link https://zulip.com/api/group-setting-values#updating-group-setting-values}
export interface GroupSettingUpdate {
  new: GroupSettingValue,
  old?: GroupSettingValue,
}
