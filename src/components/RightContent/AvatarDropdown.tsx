import React, { useCallback } from 'react';
// import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import LoginWithTwitch from '@/components/Login/LoginWithTwitch';
import { history } from 'umi';
import { useUser } from '../../services/hooks/api';
// import { outLogin } from '@/services/login';
// import { stringify } from 'querystring';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export interface GlobalHeaderRightProps {
  menu?: boolean;
}

/**
 * 退出登录，并且将当前的 url 保存
 */
// const loginOut = async () => {
//   await outLogin();
//   const { query, pathname } = history.location;
//   const { redirect } = query;
//   // Note: There may be security issues, please note
//   // if (window.location.pathname !== '/user/login' && !redirect) {
//   if (window.location.pathname !== '/' && !redirect) {
//     history.replace({
//       pathname: '/',
//       // pathname: '/user/login',
//       search: stringify({
//         redirect: pathname,
//       }),
//     });
//   }
// };

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const { data: userData, isLoading, mutate } = useUser();

  const onMenuClick = useCallback((event: { key: React.Key }) => {
    const { key } = event;
    if (key === 'logout') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      // sets user to null
      mutate(null);
      return;
    }
    history.push(`/account/${key}`);
  }, []);

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (isLoading) {
    return loading;
  }

  if (!userData || !userData.display_name) {
    return <LoginWithTwitch />;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {/* {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />} */}

      <Menu.Item key="logout">
        <LogoutOutlined />
        Sign Out
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          src={userData.profile_image_url}
          alt="avatar"
        />
        <span className={`${styles.name} anticon`}>{userData.display_name}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
