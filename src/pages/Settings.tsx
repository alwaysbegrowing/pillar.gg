import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Input } from 'antd';
import StripeCustomerPortalPlugin from '../components/StripePlugin/StripeCustomerPortalPlugin';
// import styles from './Settings.less';


const Settings = () => {
  // const data:any = [
  //   <StripeCustomerPortalPlugin />
  // ]

    return (
      <PageContainer>
        <Card title={"Wakeword"}>
          <div><Input placeholder="CLIPIT"/></div>
          <br/>
          <div>Pillar will automatically create a clip when it finds a wakeword in your chat. <br/><br/>Example: You send a message "CLIPIT" to your chat, and we will analyze that moment of your VOD and create a clip that contains your chat message.<br/><br/>Use wakewords to create clips manually, and have those clips be easily editable + exportable inside the Pillar editor.
          </div>
        </Card>
      </PageContainer>
    );
  }

export default Settings;


