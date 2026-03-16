import type { ZulipRC } from '../zuliprc';
import type { GroupSettingUpdate, GroupSettingValue, UserGroup } from '../types/groups';
import api from '../api';

// {@Link https://zulip.com/api/get-user-groups}
export interface GetUserGroupsParams {
  include_deactivated_groups?: boolean
}

export interface GetUserGroupsResponse {
  user_groups: UserGroup[]
}

// {@Link https://zulip.com/api/create-user-group}
export interface CreateUserGroupParams {
  name: string,
  description: string,
  members: number[],
  subgroups?: number[],
  can_add_members_group?: GroupSettingValue,
  can_remove_members_group?: GroupSettingValue,
  can_mention_group?: GroupSettingValue,
  can_manage_group?: GroupSettingValue,
  can_leave_group?: GroupSettingValue,
  can_join_group?: GroupSettingValue,
}

export interface CreateUserGroupResponse {
  group_id: number
}

// {@Link https://zulip.com/api/update-user-group}
export interface UpdateUserGroupParams {
  user_group_id: number,
  name?: string,
  description?: string,
  deactivated?: boolean,
  can_add_members_group?: GroupSettingUpdate,
  can_remove_members_group?: GroupSettingUpdate,
  can_mention_group?: GroupSettingUpdate,
  can_manage_group?: GroupSettingUpdate,
  can_leave_group?: GroupSettingUpdate,
  can_join_group?: GroupSettingUpdate,
}

// {@Link https://zulip.com/api/deactivate-user-group}
export interface DeactivateUserGroupParams {
  user_group_id: number
}

// {@Link https://zulip.com/api/get-user-group-members}
export interface GetUserGroupMembersParams {
  user_group_id: number,
  direct_member_only?: boolean,
}

export interface GetUserGroupMembersResponse {
  members: number[]
}

// {@Link https://zulip.com/api/update-user-group-members}
export interface UpdateUserGroupMembersParams {
  user_group_id: number,
  add?: number[],
  delete?: number[],
  add_subgroups?: number[],
  delete_subgroups?: number[],
}

// {@Link https://zulip.com/api/get-is-user-group-member}
export interface CheckUserGroupMemberParams {
  user_group_id: number,
  user_id: number,
  direct_member_only?: boolean,
}

export interface CheckUserGroupMemberResponse {
  is_user_group_member: boolean
}

// {@Link https://zulip.com/api/get-user-group-subgroups}
export interface GetUserGroupSubgroupsParams {
  user_group_id: number,
  direct_subgroup_only?: boolean
}

export interface GetUserGroupSubgroupsResponse {
  subgroups: number[]
}

// {@Link https://zulip.com/api/update-user-group-subgroups}
export interface UpdateUserGroupSubgroupsParams {
  user_group_id: number,
  add?: number[],
  delete?: number[],
}

export default function groups(config: ZulipRC) {
  return {
    retrieve: (params?: GetUserGroupsParams) => {
      return api<GetUserGroupsResponse>('/user_groups', config, 'GET', params);
    },
    create: (params: CreateUserGroupParams) => {
      return api<CreateUserGroupResponse>('/user_groups/create', config, 'POST', params);
    },
    update: (params: UpdateUserGroupParams) => {
      const { user_group_id, ...rest } = params;
      const url = `/user_groups/${user_group_id}`;
      return api<{}>(url, config, 'PATCH', rest);
    },
    deactivate: (params: DeactivateUserGroupParams) => {
      const url = `/user_groups/${params.user_group_id}`;
      return api<{}>(url, config, 'DELETE');
    },
    members: {
      retrieve: (params: GetUserGroupMembersParams) => {
        const { user_group_id, ...rest } = params;
        const url = `/user_groups/${user_group_id}/members`;
        return api<GetUserGroupMembersResponse>(url, config, 'GET', rest);
      },
      update: (params: UpdateUserGroupMembersParams) => {
        const { user_group_id, ...rest } = params;
        const url = `/user_groups/${user_group_id}/members`;
        return api<{}>(url, config, 'POST', rest);
      },
      check: (params: CheckUserGroupMemberParams) => {
        const { user_group_id, user_id, ...rest } = params;
        const url = `/user_groups/${user_group_id}/members/${user_id}`;
        return api<CheckUserGroupMemberResponse>(url, config, 'GET', rest);
      },
    },
    subgroups: {
      retrieve: (params: GetUserGroupSubgroupsParams) => {
        const { user_group_id, ...rest } = params;
        const url = `/user_groups/${user_group_id}/subgroups`;
        return api<GetUserGroupSubgroupsResponse>(url, config, 'GET', rest);
      },
      update: (params: UpdateUserGroupSubgroupsParams) => {
        const { user_group_id, ...rest } = params;
        const url = `/user_groups/${user_group_id}/subgroups`;
        return api<{}>(url, config, 'POST', rest);
      },
    },
  };
}
