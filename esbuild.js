/* eslint-disable */
// esbuild.config.js
require('dotenv').config()

const chokidar = require ('chokidar')
const esbuild = require('esbuild')
const http = require('http')
const postCssPlugin = require('@deanc/esbuild-plugin-postcss')

// plugins
const customPlugins = require('./config/esbuild/customPlugins')

const esbuildUpdateServerPort = process.env.ESBUILD_UPDATE_SERVER_PORT || '3035'

// initialize
const clients = []
const shouldWatch = process.argv.includes('--watch')
const ignoreRefresh = process.argv.includes('--ignore-refresh')
const buildEnvironmentFromRailsEnv = {
  development: 'development',
  test: 'development',
  staging: 'production',
  production: 'production'
}
const buildMode = buildEnvironmentFromRailsEnv[process.env.RAILS_ENV]
const isProductionBuild = buildMode === 'production'

const buildConfig = {
  assetNames: '[name]-[hash].digested',
  bundle: true,
  chunkNames: '[name]-[hash].digested',
  define: {
    'process.env.BUNDLER': '"esbuild"',
    'process.env.NODE_ENV': `"${buildMode}"`,
    'process.env.RAILS_ENV': `"${process.env.RAILS_ENV}"`,
    'process.env.ESBUILD_UPDATE_SERVER_PORT': esbuildUpdateServerPort
  },
  entryPoints: [
    'app/client/packs/application.js',
  ],
  format: 'esm',
  loader: {
    '.gif': 'file',
    '.json': 'json',
    '.png': 'file',
    '.svg': 'dataurl',
    '.ttf': 'file',
    '.woff': 'file'
  },
  logLevel: shouldWatch ? 'error' : 'info',
  metafile: true,
  minify: isProductionBuild,
  outdir: 'app/assets/builds',
  publicPath: '/assets',
  plugins: [
    postCssPlugin(require('./postcss.config')),
    customPlugins.cleanup()
  ],
  sourcemap: false,
  splitting: true,
  target: ["safari12", "edge83", "chrome77", "firefox77", "ios13"]
}

// watch script via chokida OR just esbuild
if (shouldWatch) {
  const watchedDirectories = [
    "./app/client/**/*.{js,jsx,ts,tsx,css,scss,json}",
    "./app/client/packs/**/**.*"
  ]

  http
    .createServer((req, res) => {
      res.on('close', () => {
        const index = clients.indexOf(res)
        if (index >= 0) {
          clients.splice(index, 1)
        }
      })
      return clients.push(
        res.writeHead(200, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
          Connection: "keep-alive",
        })
      );
    })
    .listen(esbuildUpdateServerPort);

  (async () => {
    // If the initial build fails (when watching) (e.g., from bad syntax) the catch will keep the
    // program from crashing, but it will return undefined. Therefore, result is undefined and it
    // will cause an NPE in the watch callback. Now we can reuse this when result is undefined.
    const initialBuild = () => esbuild
      .context(buildConfig)
      .catch((error) => {
        console.log(error)
        if (!shouldWatch) {
          process.exit(1)
        }
      })
    let context = await initialBuild()
    await context.rebuild().catch((err) => {
      console.error(err)
    });
    console.log('❤❤❤❤❤ WATCH ❤❤❤❤❤ Initial asset build complete...')

    let counter = 0
    console.log('❤❤❤❤❤ WATCH ❤❤❤❤❤ Your assets are being watched...')
    chokidar.watch(watchedDirectories).on("all", async (event, path) => {
      if (event === "change") {
        console.log(`❤❤❤❤❤ WATCH ❤❤❤❤❤  Rebuilding ${path}`);
        const iteration = counter++
        console.time(`❤❤❤❤❤ WATCH ❤❤❤❤❤  Done ${iteration}`);

        await context.rebuild().catch((err) => {
          // TODO: need to do some better formatting around this error, but this keeps
          //  build from crashing for now
          console.error(err)
        });

        console.timeEnd(`❤❤❤❤❤ WATCH ❤❤❤❤❤  Done ${iteration}`);

        // if the --ignore-refresh argument is passed, do not automatically refresh browser pages when
        // files are saved
        if (!ignoreRefresh) {
          clients.forEach((res) => res.write("data: update\n\n"));
        }
      }

    });
  })();
} else {
  esbuild.build(buildConfig).catch(() => process.exit(1));
}
