import React from 'react';
import type { BasicLayoutProps } from '@ant-design/pro-layout';

import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import defaultSettings from '../config/defaultSettings';

export const layout = (): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,

    menuHeaderRender: undefined,
    ...defaultSettings,
  };
};
