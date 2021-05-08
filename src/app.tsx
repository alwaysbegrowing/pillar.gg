import React from 'react';
import type { BasicLayoutProps } from '@ant-design/pro-layout';

import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import defaultSettings from '../config/defaultSettings';
import { ContextWrapper } from './ContextWrapper';

export const layout = (): BasicLayoutProps & {
  childrenRender?: (dom: JSX.Element) => React.ReactNode;
} => {
  return {
    childrenRender: (children) => <ContextWrapper>{children}</ContextWrapper>,
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    menuHeaderRender: undefined,
    ...defaultSettings,
  };
};
