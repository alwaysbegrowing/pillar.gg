import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import StripeCheckoutPlugin from '../components/StripePlugin/StripeCheckoutPlugin';
// import styles from './Analysis.less';

const Analysis = () => {
    return (
      <PageContainer>
        <Card>
          <h1>Coming Soon</h1>
          <StripeCheckoutPlugin />
        </Card>
      </PageContainer>
    );
  }

export default Analysis;
