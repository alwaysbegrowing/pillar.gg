import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, List, Divider } from 'antd';
import StripeCustomerPortalPlugin from '../components/StripePlugin/StripeCustomerPortalPlugin';
// import styles from './Settings.less';


const Settings = () => {
  const data:any = [
    <StripeCustomerPortalPlugin />
  ]

    return (
      <PageContainer>
        <Card>
          <Divider orientation="left">Settings</Divider>
          <List
            size="large"
            bordered
            dataSource={data}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </Card>
      </PageContainer>
    );
  }

export default Settings;


