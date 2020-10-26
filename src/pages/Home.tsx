import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
// import styles from './Home.less';
import LinkYoutubeButton from '../components/LinkYoutubeButton/LinkYoutubeButton';
import YoutubeAuthPortal from '@/components/AuthPortal/YoutubeAuthPortal';

interface IProps {
}

interface IState {
  isYoutubeLinked:boolean
}

export default class Home extends React.Component<IProps, IState> {

  constructor(props:any) {
    super(props);
    this.state = {
      isYoutubeLinked: true,
      openYoutubeAuthPortal: false
    }
  }

  componentDidMount() {
    fetch('/api/getYoutubeSyncStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id: localStorage.getItem('user_id')})
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({isYoutubeLinked: result})
      });

    window.onmessage = (event) => {
      if (event.data.success) {
        // console.log(event.data.access_token);
        // TODO: Do something with event.data.access_token
      }
    };
  }

  toggleAuthPortal() {
    console.log("show youtube portal")
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
          {!this.state.isYoutubeLinked && <LinkYoutubeButton onClick={() => this.toggleAuthPortal()}/> }
          {this.state.openYoutubeAuthPortal && <YoutubeAuthPortal />}
        </Card>
      </PageContainer>
    )
  }
}

// export default (): React.ReactNode => (
//   const
//   <PageContainer>
//     <Card>
//       <h1>Welcome to ClipClock</h1>
//     </Card>
//   </PageContainer>
// );
