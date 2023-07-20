// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

// Entrypoint for ESBuild

if (process.env.NODE_ENV === 'development') {
  console.log('is dev')
  const esbuildUpdateServerPort = process.env.ESBUILD_UPDATE_SERVER_PORT || '3035'
  ;(() =>
    (new EventSource(`http://localhost:${esbuildUpdateServerPort}`).onmessage = () =>
      location.reload()))()
}

document.addEventListener('DOMContentLoaded', () => {
  // Load main App.jsx tree
    import(`../typescript/app/App`)
      .then(({default: App}) => {
      })
      .catch((error) => {
        console.error(`An error occurred while loading the component: ${error}`) // eslint-disable-line no-console
      })
  // }
})
