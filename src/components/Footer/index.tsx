import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout';
import { useIntl } from 'umi';

export default () => (
  <DefaultFooter
    copyright={useIntl().formatMessage({ id: 'component.Footer.copyright' })}
    links={[
      {
        key: useIntl().formatMessage({ id: 'component.Footer.key' }),
        title: useIntl().formatMessage({ id: 'component.Footer.title' }),
        href: 'https://app.pillar.gg/PrivacyPolicy',
        blankTarget: true,
      },
    ]}
  />
);
