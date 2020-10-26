import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Typography } from 'antd';

class YoutubeAuth extends React.PureComponent {
    componentDidMount() {
        this.authenticateTwitch();
    }

    // TODO: Add this to a utils module or something... Matt
    getHashValue(key: string) {
        const matches = window.location.hash.match(new RegExp(`${key}=([^&]*)`));
        return matches ? matches[1] : null;
    }

    authenticateTwitch() {
        const accessToken = this.getHashValue('access_token');
        if (accessToken != null) {
            window.opener?.parent?.postMessage({ success: true, access_token: accessToken }, "*");
        } else {
            window.opener?.parent?.postMessage({ success: false }, "*");
        }
        window.close();
    }

    render() {
        return (
            <PageContainer>
                <Card>
                    <Typography.Text>
                        Authenticating Youtube...
                    </Typography.Text>
                </Card>
            </PageContainer>
        )
    }
  }
  export default YoutubeAuth;
