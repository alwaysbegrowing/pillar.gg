import React from 'react';
import { BasicLayoutProps, Settings as LayoutSettings } from '@ant-design/pro-layout';
import { notification } from 'antd';
import { history, RequestConfig } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { ResponseError } from 'umi-request';
import defaultSettings from '../config/defaultSettings';
import { queryCurrent } from './services/user';

export async function getInitialState(): Promise<{
  settings?: LayoutSettings;
  currentUser?: API.CurrentUser;
  fetchUserInfo: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const currentUser = {
        name: 'Sample',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        email: 'example@deephire.com',
      };
      return currentUser;
    } catch (error) {
      history.push('/');
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== '/' && history.location.pathname !=='/TwitchAuth') {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings; currentUser?: API.CurrentUser };
}): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      // const { currentUser } = initialState;
      // const { location } = history;
      // 如果没有登录，重定向到 login
      if (!currentUser && location.pathname !== '/' && location.pathname !== '/TwitchAuth') {
        history.push('/');
      }

    },
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};

const codeMessage = {
  200 : 'The server successfully returned the requested data. ' ,
  201 : 'Create or modify data successfully. ' ,
  202 : 'A request has entered the background queue (asynchronous task). ' ,
  204 : 'Delete data successfully. ' ,
  400 : 'The request sent has an error, and the server has not performed any new or modified data operations. ' ,
  401 : 'The user does not have permission (the token, username, password are wrong). ' ,
  403 : 'The user is authorized, but access is forbidden. ' ,
  404 : 'The request sent was for a record that did not exist, and the server did not operate. ' ,
  406 : 'The requested format is not available. ' ,
  410 : 'The requested resource has been permanently deleted and will no longer be available. ' ,
  422 : 'When creating an object, a validation error occurred. ' ,
  500 : 'An error occurred in the server, please check the server. ' ,
  502 : 'Gateway error. ' ,
  503 : 'Service is unavailable, the server is temporarily overloaded or maintained. ' ,
  504 : 'The gateway has timed out. ' ,
};

/**
 * Exception handler
 */
const errorHandler = (error: ResponseError) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message : `Request error ${ status } : ${ url } ` ,
      description: errorText,
    });
  }
  else if (!response) {
    notification.error({
      description : 'Your network is abnormal and you cannot connect to the server' ,
      message : 'Network abnormal' ,
    });
  }
  throw error;
};

export const request: RequestConfig = {
  errorHandler,
};
