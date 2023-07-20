import React from 'react'
import { createRoot } from "react-dom/client"
import App from "../../src/App";

import '../../css/tailwind.css'

const rootElem = document.getElementById('root')
if (!rootElem) throw new Error('Root element not found')

const root = createRoot(rootElem)
root.render(<App />)
