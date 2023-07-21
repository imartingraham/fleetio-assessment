import React, { useEffect, useState } from "react"

import { VehicleIndexSkeleton } from "../../components/VehicleIndexSkeleton"
import { VehicleCard } from "../../components/VehicleCard"
import {Vehicle} from "../../types/models/Vehicle"

export const VehiclesIndex = () => {
  const [loading, setLoading] = useState(false)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])

  useEffect(() => {
    setLoading(true)
    fetch("/vehicles")
      .then((response) => response.json())
      .then((data) => {
        setVehicles(data)
        setLoading(false)
      })
  }, [])

  return (
    <ul
      role="list"
      className="grid grid-cols-3 gap-x-4 gap-y-8 mb-10"
    >
      {loading ? (
        <VehicleIndexSkeleton />
      ) : (
        vehicles.map((vehicle) => (
          <VehicleCard vehicle={vehicle} key={vehicle.id} />
        ))
      )}
    </ul>
  )
}
