// CUSTOM CLEANUP PLUGIN -> SEE https://blog.arkency.com/tune-up-your-esbuild-config-with-plugins-and-cleanup-your-assets-directory/
function cleanup(options = {}) {
  const { pattern = '*', safelist = [], debug = false } = options
  return {
    name: 'esbuild:cleanup',
    setup(build) {
      const { glob } = require('glob')
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

exports.cleanup = cleanup
