import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, List, Divider } from 'antd';
import StripeCustomerPortalPlugin from '../components/StripePlugin/StripeCustomerPortalPlugin';
// import styles from './Settings.less';

const data:any = [
  <StripeCustomerPortalPlugin />
]
interface IProps {}

interface IState {}

export default class Settings extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
    };
  }

  render() {
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
}

