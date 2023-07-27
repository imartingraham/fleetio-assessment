import React from 'react'

import { Toaster } from "react-hot-toast"

import { Header } from "./ui/Header"
import { VehiclesIndex } from "./containers/vehicles/Index"
import { ReactDebuggingAndPerformance } from "./bonus/ReactDebuggingAndPerformance";
import {Button} from "./ui/Button";

export const HomeIndex = () => {
  const [showPerformancePage, setShowPerformancePage] = React.useState(false)
  return (
    <div className="container mx-auto max-w-screen-lg px-4 h-full">
      <Header
        headerText="Fleet Code"
        switchPage={
        <Button className="ml-4" onClick={() => setShowPerformancePage((cur) => !cur)}>
          {showPerformancePage ? 'Show Vehicles Index' : 'Show Performance Index'}
        </Button>
      }
      />

      <div className="flex mb-8 justify-center items-center" />

      {!showPerformancePage && <VehiclesIndex />}
      {showPerformancePage && <ReactDebuggingAndPerformance />}
      <Toaster />
    </div>
  )
}
