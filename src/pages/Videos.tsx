import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
// import styles from './Videos.less';

interface IProps {}

interface IState {}

export default class Videos extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <PageContainer>
        <Card>
          <div></div>
        </Card>
      </PageContainer>
    );
  }
}

