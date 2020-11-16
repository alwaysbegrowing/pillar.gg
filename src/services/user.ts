import { request } from 'umi';

export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}

export async function queryCurrent() {
  const twitch_access_code = localStorage.getItem('twitch_access_token');
  if(twitch_access_code) {
    return request<API.CurrentUser>('/api/user/getUserAccessInfo', {
      method: 'post',
      data: {
        twitch_access_token: twitch_access_code
      }
    });
  }
  else {
    return(undefined);
  }

}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}
