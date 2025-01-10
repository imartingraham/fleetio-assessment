import React, {useState, useEffect} from "react"
import {Vehicle} from "../types/models/Vehicle"
import { VehicleCard } from "./VehicleCard"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { Modal } from "./Modal"

export const LowEfficiencyAlert = () => {
  const [showLowestEfficient, setShowLowestEfficient] = useLocalStorage("showLowestEfficient", true)
  const [vehicle, setVehicle] = useState<Vehicle>()
  useEffect(() => {
    if(showLowestEfficient){
      fetch("/vehicles/lowest_efficiency")
      .then((response) => response.json())
      .then(data => {
        setVehicle(data)
      }).catch(e => {
        // a production environment we would want to
        // logging to let us know if this is failing
        // I feel this is something that could fail silently for
        // the user/visitor since displaying an error message or
        // something similar could be confusing
        console.error(e.message)
      }
    }
  }, [])

  const onClose = () => {
    setShowLowestEfficient(false)
  }

  if(showLowestEfficient && vehicle){
    return (
      <Modal showModal={true} onClose={onClose}>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5" role="alert">
          <span className="block sm:inline">This vehicle has the lowest efficiency of our entire fleet.</span>
        </div>
        <VehicleCard vehicle={vehicle} />
      </Modal>
    )
  }
}