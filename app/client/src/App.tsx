import React from 'react'
import { createRoot } from "react-dom/client"

// load tailwind here and esbuild will handle it
import '../css/tailwind.css'

import { Toaster } from "react-hot-toast"

import { Header } from "./ui/Header"
import { VehiclesIndex } from "./containers/vehicles/Index"

const App = () => (
  <div className="container mx-auto max-w-screen-lg px-4">
    <Header
      imgSrc="https://tailwindui.com/img/logos/workflow-mark.svg?color=green&shade=700"
      headerText="Fleet Code"
    />

    <VehiclesIndex />

    <Toaster />
  </div>
);

const rootElem = document.getElementById('root')
if (!rootElem) throw new Error('Root element not found')

const root = createRoot(rootElem)
root.render(<App />)
