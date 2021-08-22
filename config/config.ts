// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    name: 'Pillar',
    locale: true,
    ...defaultSettings,
  },
  locale: {
    // default zh-en
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    // {
    //   path: '/home',
    //   name: 'home',
    //   icon: 'HomeOutlined',
    //   component: './Home',
    // },
    {
      path: '/vods',
      name: 'Vods',
      icon: 'VideoCameraOutlined',
      hideChildrenInMenu: true,
      routes: [
        {
          path: '/vods',
          name: 'Vods',
          component: './Vods',
        },
        {
          path: '/vods/:id',
          name: 'Select Clips',
          component: './Editor',
        },
      ],
    },

    // {
    //   path: '/analysis',
    //   name: 'analysis',
    //   icon: 'LineChartOutlined',
    //   component: './Analysis',
    // },
    {
      path: '/discord',
      name: 'Discord',
      icon: 'MessageOutlined',
      component: './Discord',
    },
    {
      path: '/settings',
      name: 'settings',
      icon: 'SettingOutlined',
      component: './Settings',
    },
    {
      path: '/',
      layout: false,
      component: './Landing',
    },
    {
      path: '/TwitchAuth',
      layout: false,
      component: './TwitchAuth',
    },
    {
      path: '/AuthSuccess',
      layout: false,
      component: './AuthSuccess',
    },
    {
      path: '/PrivacyPolicy',
      layout: false,
      component: './PrivacyPolicy',
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
  },
});
