const config = {
  directories: {
    output: "dist",
  },
  productName: "dv2ex",
  extraResources: [
    {
      from: "config",
      to: "config",
    },
    {
      from: "node_modules/dv2ex/www",
      to: "www",
    },
  ],
};

module.exports = config;
