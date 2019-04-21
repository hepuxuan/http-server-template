/**
 * forked from https://github.com/reactjs/express-react-views/blob/master/index.js
 */

var React = require("react");
var ReactDOMServer = require("react-dom/server");
var assign = require("object-assign");
var _escaperegexp = require("lodash.escaperegexp");

var DEFAULT_OPTIONS = {
  doctype: "<!DOCTYPE html>",
  transformViews: true,
  babel: {
    presets: [
      "@babel/preset-react",
      [
        "@babel/preset-env",
        {
          targets: {
            node: "current"
          }
        }
      ]
    ],
    plugins: [
      [
        "css-modules-transform",
        {
          generateScopedName: "[hash:base64]"
        }
      ]
    ]
  }
};

function createEngine(engineOptions) {
  var registered = false;
  var moduleDetectRegEx;

  engineOptions = assign({}, DEFAULT_OPTIONS, engineOptions || {});

  function renderFile(filename, options, cb) {
    // Defer babel registration until the first request so we can grab the view path.
    if (!moduleDetectRegEx) {
      // Path could contain regexp characters so escape it first.
      // options.settings.views could be a single string or an array
      moduleDetectRegEx = new RegExp(
        []
          .concat(options.settings.views)
          .map(viewPath => "^" + _escaperegexp(viewPath))
          .join("|")
      );
    }

    if (engineOptions.transformViews && !registered) {
      // Passing a RegExp to Babel results in an issue on Windows so we'll just
      // pass the view path.
      require("@babel/register")(
        assign({ only: [].concat(options.settings.views) }, engineOptions.babel)
      );
      registered = true;
    }

    try {
      var markup = engineOptions.doctype;
      var component = require(filename);
      // Transpiled ES6 may export components as { default: Component }
      component = component.default || component;
      markup += ReactDOMServer.renderToString(
        React.createElement(component, options)
      );
    } catch (e) {
      return cb(e);
    } finally {
      if (options.settings.env === "development") {
        // Remove all files from the module cache that are in the view folder.
        Object.keys(require.cache).forEach(function(module) {
          if (moduleDetectRegEx.test(require.cache[module].filename)) {
            delete require.cache[module];
          }
        });
      }
    }

    cb(null, markup);
  }

  return renderFile;
}

exports.createEngine = createEngine;
