import { Slider } from 'antd';
import React from 'react';

const Timeline = () => {
  return (
    <div>
      <Slider range={{ draggableTrack: true }} defaultValue={[20, 50]} />
    </div>
  );
};

export default Timeline;
