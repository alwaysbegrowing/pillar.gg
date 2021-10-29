import React from 'react';
import type { BasicLayoutProps } from '@ant-design/pro-layout';
import * as FullStory from '@fullstory/browser';

import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import defaultSettings from '../config/defaultSettings';
import { ContextWrapper } from './ContextWrapper';

const fullStoryOpts: FullStory.SnippetOptions = { orgId: '167CBS' };

if (process.env.NODE_ENV !== 'production') {
  // fullStoryOpts.debug = true;
  // fullStoryOpts.devMode = true;
}

// `FS.getCurrentSessionURL()` in console to view session
FullStory.init(fullStoryOpts);

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
