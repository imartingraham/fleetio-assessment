import React, { useEffect, useState } from "react"
import { Modal } from '../../components/Modal'
import {VehicleSearch} from '../../components/VehicleSearch'
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
      })
  }
  const groupedVehicles = (vehicles: Record<string, Vehicle[]>) => {
    if(!Object.keys(vehicles).length){
      return <p className="mt-5">No results found</p>
    }

    return Object.keys(vehicles).sort().map(key => {
      const autos = vehicles[key].map(vehicle => <VehicleCard vehicle={vehicle} key={vehicle.id} />)
      return (
        <div key={key}>
          <h2 className="text-2xl font-bold">{key}</h2>
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
