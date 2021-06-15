import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// *******************************************************
// RAIL
// *******************************************************
const railOuterStyle = {
  position: 'absolute',
  width: '100%',
  height: "5rem",
  backgroundColor: "gray",
  transform: 'translate(0%, 0%)',
  borderRadius: 7,
  cursor: 'pointer',
  zIndex: 0
  // border: '1px solid white',
}

const railInnerStyle = {
  position: 'absolute',
  width: '100%',
  height: "1rem",
  transform: 'translate(0%, -50%)',
  borderRadius: 7,
  pointerEvents: 'none',
  backgroundColor: 'rgb(155,155,155)',
  zIndex: 0
}

export function ClipSliderRail({ getRailProps }) {
  return (
    <Fragment>
      <div style={railOuterStyle} {...getRailProps()} />
      <div style={railInnerStyle} />
    </Fragment>
  )
}

ClipSliderRail.propTypes = {
  getRailProps: PropTypes.func.isRequired,
}

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
          transform: 'translate(-50%, -50%)',
          WebkitTapHighlightColor: 'rgba(0,0,0,0)',
          zIndex: 5,
          width: 28,
          height: 150,
          cursor: 'pointer',
          backgroundColor: 'none',
          display: disabled? 'none' : 'block'
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
          transform: 'translate(-50%, 0%)',
          zIndex: 1,
          width: 8,
          height: 150,
          // borderRadius: '50%',
          boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.3)',
          backgroundColor: '#b28900',
          display: disabled? 'none' : 'block'
        }}
      />
    </Fragment>
  )
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
}

ClipHandle.defaultProps = {
  disabled: false,
}

// *******************************************************
// TRACK COMPONENT
// *******************************************************
export function ClipTrack({ source, target, getTrackProps, disabled }) {
  return (
    <div
      style={{
        position: 'absolute',
        transform: 'translate(0%, 0%)',
        height: 80,
        zIndex: 0,
        backgroundColor: '#b28900',
        opacity: 0.5,
        border: '4px solid rgb(178, 137, 0)',
        border: '4px solid rgba(178, 137, 0, 1)',
        // borderRadius: 7,
        // borderStyle: 'solid',
        // borderWidth: 4,
        // borderColor: '#ffc400',
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
        display: disabled? 'none' : 'block'
      }}
      {...getTrackProps()}
    ><div style={{textAlign: "center", transform: "translate(0, 100%)", color: "white", fontWeight: "bold", zIndex: 2}}>100s</div></div>
  )
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
}

ClipTrack.defaultProps = {
  disabled: false,
}

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
          backgroundColor: 'rgb(200,200,200)',
          left: `${tick.percent}%`,
          zIndex: 10
        }}
      />
      <div
        style={{
          position: 'absolute',
          marginTop: 22,
          fontSize: 10,
          textAlign: 'center',
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`,
          zIndex: 10
        }}
      >
        {format(tick.value)}
      </div>
    </div>
  )
}

ClipTick.propTypes = {
  tick: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  count: PropTypes.number.isRequired,
  format: PropTypes.func.isRequired,
}

ClipTick.defaultProps = {
  format: d => d,
}
