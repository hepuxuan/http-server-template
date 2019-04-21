const fs = require("fs");
const path = require("path");
const webpackConfig = require("../../config/webpack.dev");
const hash =
  process.env.NODE_ENV === "production"
    ? JSON.parse(
        fs
          .readFileSync(path.resolve(__dirname, "../../config/assetsInfo.json"))
          .toString()
      )
    : {};

function getChunkHash(chunkName) {
  if (process.env.NODE_ENV === "production") {
    return `${webpackConfig.output.publicPath}/${hash[chunkName].js}`;
  } else {
    return `${webpackConfig.output.publicPath}/${chunkName}.js`;
  }
}

function getStyleChunkHash(chunkName) {
  if (process.env.NODE_ENV === "production") {
    return `${webpackConfig.output.publicPath}/${hash[chunkName].css}`;
  } else {
    return `${webpackConfig.output.publicPath}/${chunkName}.css`;
  }
}

function getVendorHash() {
  if (process.env.NODE_ENV === "production") {
    return `${webpackConfig.output.publicPath}/${hash.vendors.js}`;
  } else {
    return `${webpackConfig.output.publicPath}/vendors.js`;
  }
}

module.exports = { getChunkHash, getStyleChunkHash, getVendorHash };
