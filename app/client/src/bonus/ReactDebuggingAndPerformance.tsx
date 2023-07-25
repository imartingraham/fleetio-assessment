/*
 *
 * _________________ READ ME FIRST! __________________
 *
 *
 *
 *
 * We're trying to see what stands out as wrong to you in this file.
 *
 * A few notes:
 * 1. There are various bugs in this file and some things that could be improved.
 * 2. "Why would you do that?" is likely be a valid question for some things! Do them in a
 *    better way, or your way!
 * 3. Some things could be completely unnecessary in this file, so feel free to
 *    remove things as well. We're trying to see what stands out to you as wrong.
 * 4. There may be a helpful hook to use in 'app/client/src/hooks' (also see if there's
 *    anything wrong with the hook).
 */


import React, {useCallback, useEffect, useState} from 'react'
import { Button } from "../ui/Button";
import { SubHeader } from "../ui/SubHeader";
import {DebuggingVehicle, fetchVehicles} from "./getVehicles";

interface TopMileageVehiclesProps {
  data: DebuggingVehicle[]
}

function TopMileageVehicles({ data }: TopMileageVehiclesProps) {
  return (
    <div>
      <div className="text-xl font-bold mb-2">
        Top 50 vehicles by mileage:
      </div>
      {
        data.sort((a, b) => b.miles - a.miles).slice(0, 50).map((v) => (
          <div key={v.id}>
            Id = {v.id} <span className="pl-2">Miles {v.miles}</span>
          </div>
        ))
      }
    </div>
  )
}

interface ReactDebuggingAndPerformanceProps {
  generateNewData: () => void
  data: DebuggingVehicle[]
}

function InternalReactDebuggingAndPerformance(props: ReactDebuggingAndPerformanceProps) {
  const { data, generateNewData } = props
  const totalMileage = data.map((d) => d.miles).reduce((a, b) => a + b, 0)
  const loadNewData = useCallback(generateNewData, [generateNewData])
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Button onClick={loadNewData}>Load new data</Button>
      </div>
      <div>Number of records: {data.length}</div>
      <div className="">Sum of mileage: {totalMileage}</div>
      <TopMileageVehicles data={data} />
    </div>
  )
}

const bgColors = {
  0: 'bg-red-200',
  1: 'bg-blue-200',
  2: 'bg-green-200',
  3: 'bg-yellow-200',
  4: 'bg-purple-200'
}

/**
 * General wrapper to provide various functionality.
 * 1. The counter shouldn't take so long to render the incrementation.
 */
export function ReactDebuggingAndPerformance() {
  const [per, setPer] = useState(5_000_000)
  const [data, setData] = useState<DebuggingVehicle[]>([])

  const retrieveVehicles = useCallback(() => {
    fetchVehicles({ per }).then(setData)
  }, [])

  useEffect(() => {
    retrieveVehicles()
  }, [per])

  const [counter, setCounter] = useState<number>(0)
  return (
    <div>
      <SubHeader content="Debugging and Performance" />

      <div className="flex justify-center">
        {/* @ts-ignore */}
        <div className={`${bgColors[counter % 5]} p-4 rounded m-8 inline-block w-1/6 mx-auto`}>
          <Button
            className="w-full h-full"
            onClick={() => setCounter((i) => i + 1)}
          >
            Increment {counter}. Why does this take so long?
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <label>Num Vehicles to Retrieve</label>
        <input
          className="rounded border border-gray-200 p-1 w-24"
          onChange={(e) => setPer(+e.target.value)} value={per} type="number"
        />
      </div>

      <InternalReactDebuggingAndPerformance
        data={data}
        generateNewData={retrieveVehicles}
      />
    </div>
  )
}

