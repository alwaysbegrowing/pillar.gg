const stacked = {
  name: 'Stacked',
  description: 'A flexible template that allows you to choose custom ratios.',
  image:
    'https://i0.wp.com/www.alphr.com/wp-content/uploads/2021/03/image1-34.png?resize=690%2C1192&ssl=1',
  face: {
    aspect: 16 / 9,
    left: 0,
    top: 0,
    z: 0,
  },
  gameplay: {
    aspect: 1,
    left: 0,
    top: 0,
    z: 1,
  },
};

const blurred = {
  name: 'Blurred',
  description: 'Highlight your clip and fill extra space with a blurred video.',
  image:
    'https://i0.wp.com/www.alphr.com/wp-content/uploads/2021/03/image1-34.png?resize=690%2C1192&ssl=1',
  face: {
    aspect: 4 / 3,
    left: 0,
    top: 0,
    z: 0,
  },
  gameplay: {
    aspect: 1,
    left: 0,
    top: 0,
    z: 1,
  },
};

const fullscreen = {
  name: 'Fullscreen',
  description: 'Display your footage in fullscreen portrait mode.',
  image:
    'https://i0.wp.com/www.alphr.com/wp-content/uploads/2021/03/image1-34.png?resize=690%2C1192&ssl=1',
  face: {
    aspect: 4 / 3,
    left: 0,
    top: 0,
    z: 0,
  },
  gameplay: {
    aspect: 1,
    left: 0,
    top: 0,
    z: 1,
  },
};

const smallcam = {
  name: 'Small Facecam',
  description: 'Display your footage overlayed with a small face cam clip.',
  image:
    'https://i0.wp.com/www.alphr.com/wp-content/uploads/2021/03/image1-34.png?resize=690%2C1192&ssl=1',
  face: {
    aspect: 4 / 3,
    left: 0,
    top: 0,
    z: 0,
  },
  gameplay: {
    aspect: 1,
    left: 0,
    top: 0,
    z: 1,
  },
};

const templates = [stacked, blurred, fullscreen, smallcam];

export default templates;
