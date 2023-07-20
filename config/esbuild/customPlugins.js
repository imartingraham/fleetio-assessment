const fs = require("fs");
const path = require("path");

function alienfastI18nPlugin() {
  return {
    name: 'alienfast',
    setup(build) {
      const alienfastLoader = require('@alienfast/i18next-loader')
      const query = '?{basenameAsNamespace:true, relativePathAsNamespace: true}'

      build.onLoad({ filter: /\/locales\/index.js$/ }, async (args) => {
        const contents = await alienfastLoader.call({
          query,
          resource: args.path,
          addContextDependency: () => {},
          addDependency: () => {}
        })

        return {
          contents,
          loader: 'js'
        }
      })
    }
  }
}

/// CUSTOM SVGR PLUGIN -> SEE https://github.com/kazijawad/esbuild-plugin-svgr
function svgrPlugin(options = {}) {
  return {
    name: 'svgr',
    setup(build) {
      const svgr = require('@svgr/core').transform
      const fs = require('fs')

      build.onLoad({ filter: /\/fleeticons\/.*\.svg$/ }, async (args) => {
        const svg = await fs.promises.readFile(args.path, 'utf8')
        const contents = await svgr(svg, { ...options }, { filePath: args.path })
        return {
          contents,
          loader: options.typescript ? 'tsx' : 'jsx'
        }
      })
    }
  }
}

// CUSTOM CLEANUP PLUGIN -> SEE https://blog.arkency.com/tune-up-your-esbuild-config-with-plugins-and-cleanup-your-assets-directory/
function cleanup(options = {}) {
  const { pattern = '*', safelist = [], debug = false } = options
  return {
    name: 'esbuild:cleanup',
    setup(build) {
      const glob = require('glob')
      const fs = require('fs')
      const path = require('path')

      const options = build.initialOptions
      if (!options.outdir) {
        console.log('[esbuild cleanup] Not outdir configured - skipping the cleanup')
        return
      }
      if (!options.metafile) {
        console.log('[esbuild cleanup] Metafile is not enabled - skipping the cleanup')
        return
      }
      const safelistSet = new Set(safelist)
      build.onEnd(async (result) => {
        try {
          console.time('[esbuild cleanup] Cleaning up old assets')
          Object.keys(result.metafile.outputs).forEach((path) => safelistSet.add(path))
          await glob(path.join(options.outdir, pattern), (outterError, files) => {
            files.forEach((path) => {
              if (!safelistSet.has(path)) {
                fs.unlink(
                  path,
                  (err) =>
                    debug &&
                    console.log(
                      err
                        ? `[esbuild cleanup] ${err}`
                        : `[esbuild cleanup] Removed old file: ${path}`
                    )
                )
              }
            })
          })
        } finally {
          // Ham Update: added some extra code to persist metafile to filesystem for sprockets cleanup activity later
          const metaPath = `${options.outdir}/meta.json`
          fs.writeFileSync(metaPath, JSON.stringify(result.metafile.outputs))
          console.log(`[esbuild cleanup] Saving metafile as ${metaPath}`)

          console.timeEnd('[esbuild cleanup] Cleaning up old assets')
        }
      })
    }
  }
}

exports.alienfastI18nPlugin = alienfastI18nPlugin
exports.cleanup = cleanup
exports.svgrPlugin = svgrPlugin
