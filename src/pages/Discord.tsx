import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Button, Typography } from 'antd';
import { ReactComponent as TwitchSvg } from '@/assets/Discord-Logo-White.svg';
import Icon from '@ant-design/icons';

export const TwitchIcon = (props: any) => <Icon component={TwitchSvg} {...props} />;
const { Paragraph } = Typography;

const Discord = () => {
  return (
    <PageContainer>
      <Card>
        <Paragraph>Have questions or feedback? Want to meet our team or other streamers?</Paragraph>

        <Button
          icon={<TwitchSvg />}
          type="primary"
          href="https://discord.com/invite/35c5t46zU5?"
          target="_blank"
        >
          Join us on Discord!
        </Button>
      </Card>
    </PageContainer>
  );
};

export default Discord;
