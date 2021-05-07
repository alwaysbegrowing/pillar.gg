import { Settings as LayoutSettings } from '@ant-design/pro-layout';

export default {
  navTheme: 'light',
  primaryColor: '#722ed1',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: 'Pillar',
  pwa: false,
  logo: 'https://apppillargg-misc-assets.s3.amazonaws.com/logomark.svg',
  iconfontUrl: '',
} as LayoutSettings & {
  pwa: boolean;
};
