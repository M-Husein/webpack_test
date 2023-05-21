# Webpack test

## Webpack setup with Webpack encore and etc.

Clone or download this repo.

Then install dependencies:

```bash
npm install
```

## [Using Sass/Scss/LESS/Stylus](https://symfony.com/doc/current/frontend/encore/simple-example.html#using-sass-less-stylus)

For sass/scss:

```bash
npm install sass -D
```

Then uncomment **.enableSassLoader()** in webpack.config.js and rename all .css files in the sources/styles folder to .scss also change import statement in entry point files app.js, framework.js and library.js

For example:

```js
- import './styles/app.css';
+ import './styles/app.scss';
```

For development:

```bash
npm run dev
```

For Production:

```bash
npm run build
```

<hr />

This ia a project bootstrapped with [WebpackEncoreBundle](https://github.com/symfony/webpack-encore-bundle).

WebpackEncoreBundle: Symfony integration with Webpack Encore!
=============================================================
This bundle allows you to use the `splitEntryChunks()` feature
from [Webpack Encore][1] by reading an `entrypoints.json` file
and helping you render all of the dynamic `script` and `link`
tags needed.
[Read the documentation][2]
[1]: https://symfony.com/doc/current/frontend.html
[2]: https://symfony.com/bundles/WebpackEncoreBundle/current/index.html
