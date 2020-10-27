import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Typography } from 'antd';

class YoutubeAuth extends React.PureComponent {
    componentDidMount() {
        this.authenticateYoutube();
        console.log(window.location.hash.toString());
    }

    // TODO: Add this to a utils module or something... Matt
    getCodeSeaerchValue(key: string) {
        const matches = window.location.search.match(new RegExp(`${key}=([^&]*)`));
        return matches ? matches[1] : null;
    }

    authenticateYoutube() {
        const code = new URLSearchParams(window.location.search).get('code');
        if (code != null) {
            window.opener?.parent?.postMessage({ success: true, code: code}, "*");
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
