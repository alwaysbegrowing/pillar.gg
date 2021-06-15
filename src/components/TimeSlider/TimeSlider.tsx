import React, { Component } from 'react'
import { Slider, Rail, Handles, Tracks } from '../Slider/src'
import { SliderRail, Handle, Track } from './components' // example render components - source below
import { ClipSliderRail, ClipHandle, ClipTrack } from './ClipComponents' // example render components - source below
import { Button, Row } from 'antd'

const TimeSlider = ({showClipHandles}) => {

  const onUpdate = update => {
    this.setState({ update })
  }

  const onChange = values => {
    this.setState({ values })
  }
  const domain = [100, 500]
  const defaultValues = [150]

  const sliderStyle = {
    position: 'relative',
    width: '100%',
    touchAction: 'none',
  }

  return (
    <div>
      {/* top line slider. SeekingSlider */}
      <div style={{display: "flex"}}>
        <Slider
          rootStyle={sliderStyle}
          domain={[0, 100]} // [min, max]
          values={[{value: 30, num: 1 }]} // slider values
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    metadata={handle.metadata}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>

        </Slider>
      </div>
       {/*ClipSlider */}
      <div style={{display: "flex"}}>
        <Slider
          rootStyle={sliderStyle}
          mode={2}
          domain={[0, 100]} // [min, max]
          values={[{value: 10, num: 1 }, {value: 80, num: 1}]} // slider values
          disabled={showClipHandles}
        >
          <Rail>
            {({ getRailProps }) => <ClipSliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <ClipHandle
                    key={handle.id}
                    handle={handle}
                    metadata={handle.metadata}
                    domain={domain}
                    getHandleProps={getHandleProps}
                    disabled={showClipHandles}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <ClipTrack
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                    disabled={showClipHandles}
                  />
                ))}
              </div>
            )}
          </Tracks>

        </Slider>
      </div>
    </div>
  );
};

export default TimeSlider;
