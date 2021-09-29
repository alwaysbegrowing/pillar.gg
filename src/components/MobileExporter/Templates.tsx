const blurred = {
  name: 'Blurred',
  description: 'Highlight your clip and fill extra space with a blurred video.',
  lockAspectRatio: true,
  highlight: {
    aspect: 1,
    left: 0,
    top: 225,
    height: 375,
  },
  background: true,
};

const fullscreen = {
  name: 'Fullscreen',
  description: 'Display your footage in portrait mode. Great for clips with no facecam.',
  lockAspectRatio: true,
  highlight: {
    aspect: 9 / 16,
    left: 0,
    top: 0,
    height: 812,
  },
};

const smallcam = {
  name: 'Small Facecam',
  description: 'Display your footage overlayed with a small face cam clip.',
  lockAspectRatio: true,
  face: {
    aspect: 4 / 3,
    left: 0,
    top: 0,
    height: 150,
  },
  highlight: {
    aspect: 1,
    left: 0,
    top: 150,
    height: 375,
  },
  background: true,
};

const templates = [blurred, fullscreen, smallcam];

export default templates;
