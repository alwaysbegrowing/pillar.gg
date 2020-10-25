import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { getChildrenToRender } from './utils';
import TwitchAuthPortal from '../../components/TwitchAuthPortal/TwithAuthPortal';

// This class contains the "Connect With Twitch" button that triggers Twitch OAuth

class Banner5 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openTwitchAuthPortal: false,
    };
    this.toggleAuthPortal = this.toggleAuthPortal.bind(this);
  }

  componentDidMount() {
    window.onmessage = (event) => {
      if (event.data.success) {
        // console.log(event.data.access_token);
        // TODO: Do something with event.data.access_token
        fetch('/api/login', {
          method: 'POST',
          body: event.data.access_token,
        });
        // .then(res => console.log(JSON.stringify(res)));
      }
    };
  }

  toggleAuthPortal() {
    this.setState(
      {
        openTwitchAuthPortal: true,
      },
      () => {
        this.setState({
          openTwitchAuthPortal: false,
        });
      },
    );
  }

  render() {
    const { ...tagProps } = this.props;
    const { dataSource } = tagProps;

    delete tagProps.dataSource;
    delete tagProps.isMobile;
    const animType = {
      queue: 'bottom',
      one: {
        y: '+=30',
        opacity: 0,
        type: 'from',
        ease: 'easeOutQuad',
      },
    };

    return (
      <div {...tagProps} {...dataSource.wrapper} onClick={() => this.toggleAuthPortal()}>
        {this.state.openTwitchAuthPortal && <TwitchAuthPortal />}
        <div {...dataSource.page}>
          <QueueAnim
            key="text"
            type={animType.queue}
            leaveReverse
            ease={['easeOutQuad', 'easeInQuad']}
            {...dataSource.childWrapper}
            componentProps={{
              md: dataSource.childWrapper.md,
              xs: dataSource.childWrapper.xs,
            }}
          >
            {dataSource.childWrapper.children.map(getChildrenToRender)}
          </QueueAnim>
          <TweenOne animation={animType.one} key="title" {...dataSource.image}>
            <img src={dataSource.image.children} width="100%" alt="img" />
          </TweenOne>
        </div>
      </div>
    );
  }
}
export default Banner5;
