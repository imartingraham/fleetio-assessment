import React, {useCallback, useEffect, useState} from 'react'
import { Button } from "../ui/Button";
import { SubHeader } from "../ui/SubHeader";
import { DebuggingVehicle, fetchVehicles } from "./getVehicles";

interface TopMileageVehiclesProps {
  data: DebuggingVehicle[]
}

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

export function ReactDebuggingAndPerformance() {
  const [per, setPer] = useState(5_000_000)
  const [data, setData] = useState<DebuggingVehicle[]>([])

  const retrieveVehicles = useCallback(() => {
    fetchVehicles({ per }).then(setData)
  }, [])

  useEffect(() => {
    retrieveVehicles()
  }, [per])

  return (
    <div>
      <SubHeader content={
          <div>
            React Assessment
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

