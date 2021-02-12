# Optimized Webpack configuration for Vue Storefront 1 development
The default Webpack configuration of Vue Storefront 1 allows for fully testing all features. However, because of various reasons,
this leads to a slow transpilation time and therefore a bad developer experience. This repository contains a separate Webpack 

## Features
- Custom Webpack configuration without a local server and without SSR
- Additional plugins to make things even faster

## Installation
- Copy this Webpack configuration to the root of your Vue Storefront 1 PWA
- Copy this `public/` folder in the root of your Vue Storefront 1 PWA
- Install additional packages using `yarn`: `yarn add --dev hard-source-webpack-plugin friendly-errors-webpack-plugin uglifyjs-webpack-plugin -W`
- Earlier, the `dayjs` package had issues with TypeScript, but seems to have been fixed. If it is still giving issues, downgrade it: `yarn add dayjs@1.8.15 -W`
- Add a new script to the `scripts` section of `package.json`

```
"happydev": "cross-env NODE_ENV=development DEBUG='express:*' webpack-dev-server --open --inline --hot",
```

- Run `yarn happydev`

### Multistore
If you need multistore functioning correctly, follow these extra steps:
- Merge this `core/` with `core/` in the root of your Vue Storefront 1 PWA, replacing `client-entry.ts`
- In this `webpack.config.js`, under `devServer` add `allowedHosts` property with each storeView URL you have in your multistore config. Example: `allowedHosts: ['example.com', 'example.co.uk']`

**WARNING**: You will need to run `yarn dev` at least once: This will generate a copy of your configuration
that is picked up by the Vue environment.


## FAQ
### Will this break my PWA code?
No. Copying this Webpack configuration will not override anything and will therefore not break anything either. Please note that
this is not meant to produce production code. It is only meant to speed up development.

## Todo
- Make sure this configuration works in most cases;
- Come up with a better solution for the configuration generation (`config.json`);

