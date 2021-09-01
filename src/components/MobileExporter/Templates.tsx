const stacked = {
  name: 'Stacked',
  description: 'Customizable',
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

const simple = {
  name: '4:3 & 1:1',
  description: 'A basic template',
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

const templates = [stacked, simple, simple, simple, simple, simple, simple, simple];

export default templates;
