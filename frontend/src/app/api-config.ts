declare var process: {
  env: {
    NODE_ENV: string;
  };
};

export const API_ROOT =
  process.env['NODE_ENV'] === 'development'
    ? 'http://localhost:9000' //dev
    : 'http://ec2-13-234-119-178.ap-south-1.compute.amazonaws.com:9000'; //prod
