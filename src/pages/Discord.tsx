import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Button, Typography } from 'antd';
import { ReactComponent as TwitchSvg } from '@/assets/Discord-Logo-White.svg';
import Icon from '@ant-design/icons';

export const DiscordIcon = (props: any) => <Icon component={TwitchSvg} {...props} />;
const { Paragraph } = Typography;

const Discord = () => {
  return (
    <PageContainer>
      <Card>
        <Paragraph>
          Pillar has a warm and welcoming community! Want to ask questions? Find out more? Or just
          have a chat? Come join us on Discord.
        </Paragraph>

        <Button
          icon={<DiscordIcon />}
          type="primary"
          href="https://discord.com/invite/35c5t46zU5?"
          target="_blank"
        >
          Join our Discord
        </Button>
      </Card>
    </PageContainer>
  );
};

export default Discord;
