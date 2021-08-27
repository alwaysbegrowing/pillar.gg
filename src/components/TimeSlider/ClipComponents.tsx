import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// *******************************************************
// RAIL
// *******************************************************
const railOuterStyle = {
  position: 'absolute',
  width: '100%',
  height: '5rem',
  backgroundColor: '#8c8c8c',
  transform: 'translate(0%, 0%)',
  borderRadius: 7,
  cursor: 'pointer',
  zIndex: 0,
  // border: '1px solid white',
};

const railInnerStyle = {
  position: 'absolute',
  width: '100%',
  height: '1rem',
  transform: 'translate(0%, -50%)',
  borderTopLeftRadius: 7,
  borderTopRightRadius: 7,
  pointerEvents: 'none',
  backgroundColor: '#bfbfbf',
  zIndex: 0,
};

export function ClipSliderRail({ getRailProps }) {
  return (
    <Fragment>
      <div style={railOuterStyle} {...getRailProps()} />
      <div style={railInnerStyle} />
    </Fragment>
  );
}

ClipSliderRail.propTypes = {
  getRailProps: PropTypes.func.isRequired,
};

// *******************************************************
// HANDLE COMPONENT
// *******************************************************
export function ClipHandle({
  domain: [min, max],
  handle: { id, value, percent },
  disabled,
  getHandleProps,
}) {
  return (
    <Fragment>
      <div
        style={{
          left: `${percent}%`,
          position: 'absolute',
          transform: 'translate(-50%, 30%)',
          // borderRadius: 7,
          WebkitTapHighlightColor: 'rgba(0,0,0,0)',
          zIndex: 5,
          width: '.7rem',
          height: '3.5rem',
          cursor: 'pointer',
          backgroundColor: 'none',
          display: disabled ? 'none' : 'block',
        }}
        {...getHandleProps(id)}
      />
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{
          left: `${percent}%`,
          position: 'absolute',
          transform: 'translate(-50%, 30%)',
          borderRadius: 7,
          zIndex: 1,
          width: '.7rem',
          height: '3.5rem',
          // borderRadius: '50%',
          // boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.3)',
          backgroundColor: '#ffec3d',
          display: disabled ? 'none' : 'block',
        }}
      >
        <div
          style={{
            height: '1rem',
            width: '.2rem',
            backgroundColor: '#d4b106',
            position: 'relative',
            top: '40%',
            borderRadius: 7,
            margin: '0 auto',
          }}
        />
      </div>
    </Fragment>
  );
}

ClipHandle.propTypes = {
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  getHandleProps: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

ClipHandle.defaultProps = {
  disabled: false,
};

// *******************************************************
// TRACK COMPONENT
// *******************************************************
export function ClipTrack({
  source,
  target,
  getTrackProps,
  updatingClipDuration,
  clipLength,
  disabled,
}) {
  return (
    <div
      style={{
        position: 'absolute',
        transform: 'translate(0%, 19%)',
        height: '4rem',
        zIndex: 0,
        backgroundColor: '#ffec3d',
        opacity: 0.5,
        borderColor: '#fadb14',
        borderRadius: 7,
        borderStyle: 'solid',
        borderWidth: '.5rem',
        // borderColor: '#ffc400',
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
        display: disabled ? 'none' : 'block',
      }}
      {...getTrackProps()}
    >
      <div
        style={{
          textAlign: 'center',
          transform: 'translate(0, 70%)',
          color: 'black',
          fontWeight: 'bold',
          zIndex: 2,
        }}
      >
        {updatingClipDuration !== undefined && !isNaN(updatingClipDuration)
          ? Math.floor(updatingClipDuration) + 's'
          : clipLength + 's'}
      </div>
    </div>
  );
}

ClipTrack.propTypes = {
  source: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  target: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  getTrackProps: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

ClipTrack.defaultProps = {
  disabled: false,
};

// *******************************************************
// TICK COMPONENT
// *******************************************************
export function ClipTick({ tick, count, format }) {
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          marginTop: 14,
          width: 1,
          height: 5,
          backgroundColor: 'rgb(200,200,200, 0)',
          left: `${tick.percent}%`,
          transform: 'translate(0%, -200%)',
          zIndex: 3,
        }}
      />
      <div
        style={{
          position: 'absolute',
          marginTop: 22,
          fontSize: 10,
          textAlign: 'center',
          color: '#f0f0f0',
          // marginLeft: `${-(80 / count) / 2}%`,
          // width: `${100 / count-9}%`,
          left: `${tick.percent}%`,
          transform: 'translate(0%, -200%)',
          zIndex: 3,
        }}
      >
        {format(tick.value)}
      </div>
    </div>
  );
}

ClipTick.propTypes = {
  tick: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  count: PropTypes.number.isRequired,
  format: PropTypes.func.isRequired,
};

ClipTick.defaultProps = {
  format: (d) => d,
};
