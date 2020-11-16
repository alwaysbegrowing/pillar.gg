import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Typography } from 'antd';

class YoutubeAuth extends React.PureComponent {
    componentDidMount() {
        this.authenticateYoutube();
    }

    authenticateYoutube() {
        const code = new URLSearchParams(window.location.search).get('code');
        if (code != null) {
            window.opener?.parent?.postMessage({ success: true, code }, "*");
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
