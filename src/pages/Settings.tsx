import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Typography } from 'antd';
// import StripeCustomerPortalPlugin from '../components/StripePlugin/StripeCustomerPortalPlugin';
// import styles from './Settings.less';

const { Text, Paragraph } = Typography;

const Settings = () => {
  // const data:any = [
  //   <StripeCustomerPortalPlugin />
  // ]

  return (
    <PageContainer>
      <Card title="Wakeword">
        <Paragraph>
          Your wakeword: <Text code>!clip</Text>
        </Paragraph>

        <Paragraph>
          Pillar will automatically create a clip when it finds a wakeword sent by you or your
          moderators in your Twitch chat.
        </Paragraph>

        <Paragraph>
          For example, you go live on Twitch, and you or your moderators send the message{' '}
          <Text code>!clip</Text> to your chat. Pillar will find your wakeword and create a clip at
          that timestamp. The clip is automatically imported into the Pillar Editor, and you can
          watch it when viewing the clips for your stream.
        </Paragraph>

        {/* Card has padding, use Text as last child to not create extra whitespace */}
        <Text>
          Use wakewords to let your moderators clip great moments from your stream and easily see
          them in the Pillar Editor.
        </Text>
      </Card>
    </PageContainer>
  );
};

export default Settings;
