// Entrypoint for ESBuild

if (process.env.NODE_ENV === 'development') {
  const esbuildUpdateServerPort = process.env.ESBUILD_UPDATE_SERVER_PORT || '3035'
  ;(() =>
    (new EventSource(`http://localhost:${esbuildUpdateServerPort}`).onmessage = () =>
      location.reload()))()
}

document.addEventListener('DOMContentLoaded', () => {
  // Load main App tree
    import(`../src/App`)
      .then(({default: App}) => {}) // does nothing right now as the App injects itself into the DOM when it's loaded
      .catch((error) => {
        console.error(`An error occurred while loading the component: ${error}`) // eslint-disable-line no-console
      })
})
