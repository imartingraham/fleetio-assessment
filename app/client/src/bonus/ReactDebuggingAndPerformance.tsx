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


import React, {useCallback, useEffect, useRef, useState} from 'react'
import { Button } from "../ui/Button";
import { SubHeader } from "../ui/SubHeader";
import {DebuggingVehicle, fetchVehicles} from "./getVehicles";
import {useDebouncedFn} from "../hooks/useDebouncedFn";

interface TopMileageVehiclesProps {
  data: DebuggingVehicle[]
}

/**
 * Implement windowing on the top 10,000 vehicles list here.
 */
function TopMileageVehicles({ data }: TopMileageVehiclesProps) {
  return (
    <div>
      <div className="text-xl font-bold mb-2">
        Top 10,000 vehicles by mileage:
      </div>
      <div className="max-h-64 rounded border border-gray-400 overflow-auto divide-y divide-solid divide-gray-500 font-medium">
        {
          data.sort((a, b) => b.miles - a.miles).slice(0, 10_000).map((v) => (
            <div key={v.id} className="px-2 py-1 flex justify-around">
              <div>Id = {v.id}</div>
              <div>Miles {v.miles}</div>
            </div>
          ))
        }
      </div>
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
      <div>Number of records: {data.length.toLocaleString()}</div>
      <div className="">Sum of mileage: {totalMileage.toLocaleString()}</div>
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
 *
 * This page is laggy when changes occur. Why?
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

  // contrived for rerenders in the parent
  const colorRef = useRef(0)
  const [bgColor, setBgColor] = useState<string>(bgColors[0])
  const updateColor = useDebouncedFn(() => {
    colorRef.current = colorRef.current + 1
    // @ts-ignore
    setBgColor(bgColors[colorRef.current % 5])
  }, 30_000)
  useEffect(() => {
    updateColor()
  }, [bgColor]);

  return (
    <div>
      <SubHeader content={
          <div className={`${bgColor} mb-4`}>
            Debugging and Performance
          </div>
        }
      />
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

