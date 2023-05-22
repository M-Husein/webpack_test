/**
 * @DOCS : https://github.com/symfony/webpack-encore-bundle
 */

const path = require('path');
const Encore = require('@symfony/webpack-encore');

const nodeDev = process.env.NODE_ENV || 'dev';

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(nodeDev);
}

Encore
  .configureDevServerOptions(options => {
    options.server = {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 8080,
    };

    // CORS Issues
    // https://symfony.com/doc/current/frontend/encore/dev-server.html#cors-issues
    // options.allowedHosts = 'all';
    // in older Webpack Dev Server versions, use this option instead:
    // options.firewall = false;
  })

  // directory where compiled assets will be stored
  .setOutputPath(`public/dist/${nodeDev}/assets/`)
  // public path used by the web server to access the output path
  .setPublicPath(`/dist/${nodeDev}/assets`)
  // only needed for CDN's or sub-directory deploy
  // .setManifestKeyPrefix('dist/assets/')

  /*
    * ENTRY CONFIG
    *
    * Each entry will result in one JavaScript file (e.g. app.js)
    * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
    */
  .addEntry(`apps-${nodeDev}`, './sources/javascript/app.js')
  .addEntry(`framework-${nodeDev}`, './sources/javascript/framework.js')
  .addEntry(`library-${nodeDev}`, './sources/javascript/library.js')

  .copyFiles({
    from: './sources/fonts',
    to: `/dist/${nodeDev}` // 'images/[path][name].[hash:8].[ext]'
  })
  .copyFiles({
    from: './sources/image',
    to: `/dist/${nodeDev}` // 'images/[path][name].[hash:8].[ext]'
  })

  // enables the Symfony UX Stimulus bridge (used in assets/bootstrap.js)
  .enableStimulusBridge('./sources/controllers.json') // './assets/controllers.json'

  // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
  .splitEntryChunks()

  // will require an extra script tag for runtime.js
  // but, you probably want this, unless you're building a single-page app
  .enableSingleRuntimeChunk()

  /*
    * FEATURE CONFIG
    *
    * Enable & configure other features below. For a full
    * list of features, see:
    * https://symfony.com/doc/current/frontend.html#adding-more-features
    */
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
  .enableSourceMaps(!Encore.isProduction())
  // enables hashed filenames (e.g. app.abc123.css)
  .enableVersioning(Encore.isProduction())

  .configureBabel((config) => {
    config.plugins.push('@babel/plugin-proposal-class-properties');
  })

  // enables @babel/preset-env polyfills
  .configureBabelPresetEnv((config) => {
    config.useBuiltIns = 'usage';
    config.corejs = 3;
  })

  // enables PostCSS and autoprefixing (postcss-loader)
  .enablePostCssLoader()
  // .enablePostCssLoader((options) => {
  //   options.postcssOptions = {
  //     // the directory where the postcss.config.js file is stored
  //     config: path.resolve(__dirname, 'sub-dir', 'custom.config.js'),
  //   };
  // })

  // enables Sass/SCSS support
  // .enableSassLoader()

  // processes files ending in .less
  // .enableLessLoader()

  // processes files ending in .styl
  // .enableStylusLoader()

  // uncomment if you use TypeScript
  // .enableTypeScriptLoader()

  // uncomment if you use React
  // .enableReactPreset()

  // uncomment to get integrity="..." attributes on your script & link tags
  // requires WebpackEncoreBundle 1.4 or higher
  // .enableIntegrityHashes(Encore.isProduction())

  // uncomment if you're having problems with a jQuery plugin
  // .autoProvidejQuery()
;

module.exports = Encore.getWebpackConfig();
