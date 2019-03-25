const { paths, when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } = require("@craco/craco");
const path = require('path');
const CracoLessPlugin = require("craco-less");

const loaderNameMatches = function(rule, loaderName) {
  return rule && rule.loader && typeof rule.loader === 'string' &&
    (rule.loader.indexOf(`${path.sep}${loaderName}${path.sep}`) !== -1 ||
    rule.loader.indexOf(`@${loaderName}${path.sep}`) !== -1);
};

const getLoader = function(rules, matcher) {
  let loader;

  // Array.prototype.some is used to return early if a matcher is found
  rules.some(rule => {
    return (loader = matcher(rule)
      ? rule
      : getLoader(rule.use || rule.oneOf || (Array.isArray(rule.loader) && rule.loader) || [], matcher));
  });

  return loader;
};

module.exports = {
  plugins: [
    {
      plugin: require("craco-antd"),
      options: {
        lessLoaderOptions: {
          javascriptEnabled: true
        }
      }
    },
    {
      plugin: {
      overrideWebpackConfig: ({ webpackConfig }) => {
        const sassExtension = /\.(scss|sass)$/;
        const lessExtension = /\.less$/;

        const fileLoader = getLoader(
          webpackConfig.module.rules,
          rule => loaderNameMatches(rule, 'file-loader')
        );
        fileLoader.exclude.push(sassExtension);

        const sassRules1 = {
            test: sassExtension,
            issuer: {
              exclude: /\.less$/
            },
            loaders: [ 'style-loader',
                      'css-loader',
                      'sass-loader' ]
        }

        const sassRules2 =   {
            test: /\.scss$/,
            issuer: /\.less$/,
            use: {
              loader: require.resolve('./src/sassVarsToLess.js')
            }
        }

        const oneOfRule = webpackConfig.module.rules.find(rule => (
          typeof rule.oneOf !== 'undefined'
        ));

        const defaultSass = oneOfRule ? oneOfRule.oneOf.find((rule) => {
          if (rule.test) {
            return rule.test.toString() === sassExtension.toString();
          } else {
            return false;
          }
        }): null ;
        if (defaultSass) {
          if (defaultSass.issuer && defaultSass.issuer.exclude) {
            let exclude = defaultSass.issuer.exclude;
            if (Array.isArray(exclude)) {
              exclude.push(/\.less$/);
            } else {
              exclude = [exclude].push(/\.less$/);
            }
          } else {
              defaultSass.issuer = {};
              defaultSass.issuer.exclude = /\.less$/;
          }

        }

        webpackConfig.module.rules.push(sassRules2);
        return webpackConfig;
      }
    }
    }
  ]
};
