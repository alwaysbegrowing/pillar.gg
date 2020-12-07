import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="by Remyx"
    links={[
      {
        key: 'Privacy Policy',
        title: 'Privacy Policy',
        href: 'https://dev.pillar.gg/PrivacyPolicy',
        blankTarget: true,
      },
    ]}
  />
);
