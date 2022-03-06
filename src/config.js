const dev = {
  api: {
    URL: 'https://hn.algolia.com/api/v1'
  }
};

const prod = {
  api: {
    URL: 'https://hn.algolia.com/api/v1'
  }
};

let config;
switch (process.env.REACT_APP_STAGE) {
  case 'dev':
    config = dev;
    break;
  case 'prod':
    config = prod;
    break;
  default:
    config = dev;
    break;
}

export default {
  ...config
};
