declare namespace API {
  export interface CurrentUser {
    avatar?: string;
    name?: string;
    user_id: string;
    access?: 'none' | 'free' | 'basic' | 'pro';
    youtubeLinked?: true | false;
  }

  export interface LoginStateType {
    status?: 'ok' | 'error';
    type?: string;
  }

  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }
}
