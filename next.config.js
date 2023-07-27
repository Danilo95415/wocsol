const path = require('path');
const webpack = require('webpack');

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  env: {
    RESELLER_ID: "756181",
    API_KEY: "LfYnNn4ml2Y1QlI94txiryOyB3CZd77Z",
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision'),
    };

    // Ignore build errors
    config.plugins.push(
      new webpack.NoEmitOnErrorsPlugin()
    );

    return config;
  },
};
