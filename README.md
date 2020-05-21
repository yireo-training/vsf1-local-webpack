# Optimized Webpack configuration for Vue Storefront 1 development
The default Webpack configuration of Vue Storefront 1 allows for fully testing all features. However, because of various reasons,
this leads to a slow transpilation time and therefore a bad developer experience. This repository contains a separate Webpack 

## Improvements
- Custom Webpack configuration without a local server and without SSR
- Additional plugins to make things even faster

## Installation
- Copy this Webpack configuration to the root of your Vue Storefront 1 PWA
- Copy this `public/` folder in the root of your Vue Storefront 1 PWA
- Install some additional packages using `yarn`:
    - `yarn add --dev hard-source-webpack-plugin -W`
    - `yarn add --dev uglifyjs-webpack-plugin -W`
    - `yarn add dayjs@1.8.15 -W` ???
- Add a new script to the `scripts` section of `package.json`
    For example `"happydev": "cross-env NODE_ENV=development webpack-dev-server --open --inline --hot",`
- Run `yarn happydev`

## FAQ
### Will this break my PWA code?
No. Copying this Webpack configuration will not override anything and will therefore not break anything either. Please note that
this is not meant to produce production code. It is only meant to speed up development.

## Todo
- Make sure this configuration works in most cases;
- Come up with a better solution for the configuration generation (`config.json`);

