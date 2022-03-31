import React from 'react';
import type { BasicLayoutProps } from '@ant-design/pro-layout';
import * as FullStory from '@fullstory/browser';
import { SWRConfig } from 'swr';

import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import defaultSettings from '../config/defaultSettings';
import { ContextWrapper } from './ContextWrapper';
import swrErrorRetry from './services/hooks/retry';
import { isDebugMode } from './utils/utils';

// do not include protocol - 'https://' - or trailing '/' in _fs_host
// window._fs_host = 'relay.pillar.gg';

const fullStoryOpts: FullStory.SnippetOptions = { orgId: '167CBS' };
FullStory.init(fullStoryOpts);

// disable FullStory analytics if not in production
if (isDebugMode()) {
  fullStoryOpts.devMode = true;
}

export const layout = (): BasicLayoutProps & {
  childrenRender?: (dom: JSX.Element) => React.ReactNode;
} => {
  return {
    childrenRender: (children) => (
      <SWRConfig
        value={{
          onErrorRetry: swrErrorRetry,
        }}
      >
        <ContextWrapper>{children}</ContextWrapper>
      </SWRConfig>
    ),
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    menuHeaderRender: undefined,
    ...defaultSettings,
  };
};
