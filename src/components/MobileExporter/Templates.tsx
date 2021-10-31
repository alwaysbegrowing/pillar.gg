const blurred = {
  name: 'Blurred',
  description: 'Highlight your clip and fill extra space with a blurred video.',
  lockAspectRatio: true,
  previewUrl:
    'https://prod-render-mobileexportbucket9baad8e5-9ea5rkccv30v.s3.amazonaws.com/91db89ea-6b60-4262-90fd-4d6807e28ebb.mp4',
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
  previewUrl:
    'https://prod-render-mobileexportbucket9baad8e5-9ea5rkccv30v.s3.amazonaws.com/b249fd96-aa50-4ca3-bbf9-cd1b8afd5d3c.mp4',

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
  previewUrl:
    'https://prod-render-mobileexportbucket9baad8e5-9ea5rkccv30v.s3.amazonaws.com/f2af5c87-883f-40ab-ad9e-c1cd8a782d5f.mp4',

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
