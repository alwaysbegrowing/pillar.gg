import React, { useState } from 'react';
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import { SliderRail, Handle, Track } from './components'; // example render components - source below
import { ClipSliderRail, ClipHandle, ClipTrack, ClipTick } from './ClipComponents'; // example render components - source below

const TimeSlider = ({
  trimClipUpdateValues,
  setTrimClipUpdateValues,
  showClipHandles,
  duration,
  progress,
  setPlaying,
  setPlaytime,
  changeInterval,
}) => {
  const domain = [100, 500];
  const [updatingClipDuration, setUpdatingClipDuration] = useState<number>();

  const sliderStyle = {
    position: 'relative',
    width: '100%',
    touchAction: 'none',
  };

  const onClipUpdateValues = (values: number[]) => {
    setTrimClipUpdateValues(values);
    setUpdatingClipDuration(values[1] - values[0]);
  };

  const formatTicks = (d: number) => {
    if (d === 0) return `| 00:00`;
    return `| 00:${d}`;
  };

  return (
    <div>
      {/* top line slider. SeekingSlider. has no visual components */}
      <div style={{ display: 'flex' }}>
        <Slider
          rootStyle={sliderStyle}
          domain={[0, duration]} // [min, max]
          values={[progress]} // slider values
          onSlideStart={() => {
            setPlaying(false);
          }}
          onSlideEnd={(values) => setPlaytime(values[0])}
        >
          <Rail>{({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}</Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map((handle) => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                    changeInterval={changeInterval}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track key={id} source={source} target={target} getTrackProps={getTrackProps} />
                ))}
              </div>
            )}
          </Tracks>
        </Slider>
      </div>
      {/*ClipSlider */}
      <div style={{ display: 'flex' }}>
        {/* @ts-ignore*/}
        <Slider
          rootStyle={sliderStyle}
          mode={2}
          domain={[0, duration]} // [min, max]
          values={[0, duration]} // slider values
          disabled={showClipHandles}
          onUpdate={onClipUpdateValues}
        >
          <Rail>{({ getRailProps }) => <ClipSliderRail getRailProps={getRailProps} />}</Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map((handle, index) => (
                  <ClipHandle
                    key={handle.id}
                    handle={handle}
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
                    updatingClipDuration={updatingClipDuration}
                    clipLength={duration}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks count={4}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map((tick) => (
                  <ClipTick key={tick.id} tick={tick} count={ticks.length} format={formatTicks} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
    </div>
  );
};

export default TimeSlider;
