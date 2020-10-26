// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    name: 'ClipClock',
    locale: true,
    ...defaultSettings,
  },
  locale: {
    // default zh-en
    default: 'en',
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
    {
      path: '/user',
      layout: false,
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/home',
      name: 'home',
      icon: 'smile',
      component: './Home',
    },
    {
      path: '/videos',
      name: 'videos',
      icon: 'smile',
      component: './Videos',
    },
    {
      path: '/analysis',
      name: 'analysis',
      icon: 'smile',
      component: './Analysis',
    },
    {
      path: '/settings',
      name: 'settings',
      icon: 'smile',
      component: './Settings',
    },
    {
      path: '/feedback',
      name: 'feedback',
      icon: 'smile',
      component: './Feedback',
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
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
