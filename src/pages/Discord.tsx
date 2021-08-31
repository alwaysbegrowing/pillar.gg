import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Button } from 'antd';
// import styles from './Discord.less';

const Discord = () => {
  return (
    <PageContainer>
      <Card>
        Have questions? Feedback? Want to meet our team, or other streamers?{' '}
        <Button
          size="large"
          href="https://discord.com/invite/35c5t46zU5?"
          target="_blank"
          type="link"
        >
          Join us on Discord!{' '}
        </Button>
      </Card>
    </PageContainer>
  );
};

export default Discord;
