import React from 'react'

import { Toaster } from "react-hot-toast"

import { Header } from "./ui/Header"
import { VehiclesIndex } from "./containers/vehicles/Index"
import { ReactDebuggingAndPerformance } from "./bonus/ReactDebuggingAndPerformance"
import { Button } from "./ui/Button"
import { useLocalStorage } from './hooks/useLocalStorage'
import { LowEfficiencyAlert } from './components/LowEfficiencyAlert'
export const HomeIndex = () => {
  const [showPerformancePage, setShowPerformancePage] = useLocalStorage('showPerformancePage', false)

  return (
    <>
    <LowEfficiencyAlert />
    <div className="container mx-auto max-w-screen-lg px-4 h-full">
      <Header headerText="Fleet Code" />
      <div className="flex mb-8 justify-center items-center" />

      {!showPerformancePage && <VehiclesIndex />}
      {showPerformancePage && <ReactDebuggingAndPerformance />}
      <Toaster />
      <div className="flex items-center justify-center my-5">
        <Button theme="link" onClick={() => setShowPerformancePage(!showPerformancePage)}>
          {showPerformancePage ? 'Show Vehicles Index' : 'Show React Index'}
        </Button>
      </div>
    </div>
    </>
  )
}
