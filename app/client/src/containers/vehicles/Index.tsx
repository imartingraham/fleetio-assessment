import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"

import {VehicleSearch} from "../../components/VehicleSearch"
import { VehicleIndexSkeleton } from "../../components/VehicleIndexSkeleton"
import { VehicleCard } from "../../components/VehicleCard"
import {Vehicle} from "../../types/models/Vehicle"

export const VehiclesIndex = () => {
  const [loading, setLoading] = useState(false)
  const [vehicles, setVehicles] = useState<Record<string, Vehicle[]>>({})
  useEffect(() => {
    onSearch("")
  }, [])

  const onSearch = (text: string) => {
    let path = "/vehicles"
    // We only want to send the search when we have 3 or more characters. 
    // Otherwise we want to return full results.
    if(text.length >= 3){
      path += "?" + new URLSearchParams({search: text})
    }
    setLoading(true)
    fetch(path)
      .then((response) => response.json())
      .then((data) => {
        const vehiclesData = data.reduce((memo: Record<string, Vehicle[]>, item: Vehicle) => {
          if(!memo[item.category]){
            memo[item.category] = []
          }
          memo[item.category].push(item)
          return memo
        }, {})
        setVehicles(vehiclesData)
        setLoading(false)
      }).catch(() => {
        toast.error("Oops, something went wrong!")
        setLoading(false)
      })

  }
  const groupedVehicles = (vehicles: Record<string, Vehicle[]>) => {
    if(!Object.keys(vehicles).length){
      return <p className="mt-5">No results found</p>
    }

    return Object.keys(vehicles).sort().map(key => {
      const autos = vehicles[key].map(vehicle => (
        <li className="relative" key={vehicle.id}>
          <VehicleCard vehicle={vehicle} />
        </li>))

      return (
        <div key={key}>
          <h2 className="text-2xl font-bold mb-3">
            <div className="bg-white z-10 relative inline-block pr-3">{key}</div>
            <hr className="border-top-2 relative bottom-4" />
          </h2>
          <ul
            role="list"
            className="grid grid-cols-3 gap-x-4 gap-y-8 mb-10"
          >
          {autos}
        </ul>
      </div>
      )
    })
  }

  return (
    <>
      <div className="mb-5">
        <VehicleSearch onSearch={onSearch} />
      </div>
      
      {loading ? (
        <VehicleIndexSkeleton />
      ): (
        groupedVehicles(vehicles)
      )}
    </>
  )
}
