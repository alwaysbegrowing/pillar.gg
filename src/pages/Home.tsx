import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
// import styles from './Home.less';
import LinkYoutubeButton from '../components/LinkYoutubeButton/LinkYoutubeButton';
import YoutubeAuthPortal from '@/components/AuthPortal/YoutubeAuthPortal';

interface IProps {}

interface IState {
  shouldShowYoutubeLinkButton: boolean;
  openYoutubeAuthPortal: boolean;
}

export default class Home extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      shouldShowYoutubeLinkButton: false,
      openYoutubeAuthPortal: false,
    };
  }

  componentDidMount() {
    this.getYoutubeSyncStatus();

    window.onmessage = (event: any) => {
      if (event.data.success) {
        fetch('/api/postUserYTToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: localStorage.getItem('user_id'),
            code: event.data.code,
          }),
        }).then(() => this.getYoutubeSyncStatus());
      }
    };
  }

  getYoutubeSyncStatus() {
    fetch('/api/getYoutubeSyncStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: localStorage.getItem('user_id') }),
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({ shouldShowYoutubeLinkButton: !result });
      });
  }

  toggleAuthPortal() {
    this.setState(
      {
        openYoutubeAuthPortal: true,
      },
      () => {
        this.setState({
          openYoutubeAuthPortal: false,
        });
      },
    );
  }

  render() {
    return (
      <PageContainer>
        <Card>
          <h1>Welcome to ClipClock</h1>
          {this.state.shouldShowYoutubeLinkButton && (
            <LinkYoutubeButton onClick={() => this.toggleAuthPortal()} />
          )}
          {this.state.openYoutubeAuthPortal && <YoutubeAuthPortal />}
        </Card>
      </PageContainer>
    );
  }
}
