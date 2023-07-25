import React from 'react'
import { createRoot } from "react-dom/client"

// load tailwind here and esbuild will handle it
import '../css/tailwind.css'
import { HomeIndex } from "./HomeIndex"

const rootElem = document.getElementById('root')
if (!rootElem) throw new Error('Root element not found')

const root = createRoot(rootElem)
root.render(<HomeIndex />)
