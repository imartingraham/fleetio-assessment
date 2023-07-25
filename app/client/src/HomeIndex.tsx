import React from 'react'

import { Toaster } from "react-hot-toast"

import { Header } from "./ui/Header"
import { VehiclesIndex } from "./containers/vehicles/Index"
import { ReactDebuggingAndPerformance } from "./bonus/ReactDebuggingAndPerformance";

export const HomeIndex = () => {
  return (
    <div className="container mx-auto max-w-screen-lg px-4 h-full">
      <Header headerText="Fleet Code" />
      <div className="flex mb-8 justify-center items-center">
      </div>

      {/* Comment out for debugging bonus section. */}
      <VehiclesIndex />

      {/* Uncomment for react debugging bonus section. */}
      {/*<ReactDebuggingAndPerformance />*/}

      <Toaster />
    </div>
  )
}
