import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
// import styles from './Home.less';
import LinkYoutubeButton from '../components/LinkYoutubeButton/LinkYoutubeButton';

interface IProps {
}

interface IState {
  isYoutubeLinked:boolean
}

export default class Home extends React.Component<IProps, IState> {

  constructor(props:any) {
    super(props);
    this.state = {
      isYoutubeLinked: true
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
  }

  render() {
    return (
      <PageContainer>
        <Card>
          <h1>Welcome to ClipClock</h1>
          {!this.state.isYoutubeLinked && <LinkYoutubeButton /> }
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
