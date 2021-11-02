import React from 'react';
import type { BasicLayoutProps } from '@ant-design/pro-layout';
import * as FullStory from '@fullstory/browser';

import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import defaultSettings from '../config/defaultSettings';
import { ContextWrapper } from './ContextWrapper';

const fullStoryOpts: FullStory.SnippetOptions = { orgId: '167CBS' };
FullStory.init(fullStoryOpts);

// disable FullStory analytics if not in production
if (process.env.NODE_ENV !== 'production') {
  // fullStoryOpts.devMode = true;
}

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
