import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="by Pillar"
    links={[
      {
        key: 'Privacy Policy',
        title: 'Privacy Policy',
        href: 'https://app.pillar.gg/PrivacyPolicy',
        blankTarget: true,
      },
    ]}
  />
);
