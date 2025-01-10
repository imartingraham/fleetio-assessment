import React, {useState, useEffect} from 'react'
import {Vehicle} from '../types/models/Vehicle'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Modal } from './Modal'

const cardItemSize = {
  width: "auto",
  height: 192
}

export const LowEfficiencyAlert = () => {
  const [showLowestEfficient, setShowLowestEfficient] = useLocalStorage("showLowestEfficient", true)
  const [vehicle, setVehicle] = useState<Vehicle>()
  useEffect(() => {
    if(showLowestEfficient){
      fetch("/vehicles/lowest_efficiency")
      .then((response) => response.json())
      .then(data => {
        setVehicle(data)
      })
    }
  }, [])

  const onClose = () => {
    setShowLowestEfficient(false)
  }

  if(showLowestEfficient && vehicle){
    return (
      <Modal showModal={true} onClose={onClose}>
        <>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5" role="alert">
            <span className="block sm:inline">This vehicle has the lowest efficiency of our entire fleet.</span>
          </div>
          <div
            style={cardItemSize}
            className="flex items-center focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 group rounded-lg overflow-hidden bg-transparent"
          >
            {vehicle.image_url ? (
              <img
                src={vehicle.image_url}
                alt={vehicle.name}
                className="object-cover h-full w-full pointer-events-none"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full m-auto text-gray-300 bg-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                />
              </svg>
            )}
          </div>
          <div className="flex justify-between items-start mt-2">
            <div className="truncate">
              <p className="block text-sm font-medium truncate text-gray-900 pointer-events-none">
                {vehicle.name}
              </p>
              <p className="block text-sm font-medium text-gray-500 pointer-events-none">
                {vehicle.category}
              </p>
            </div>

            {vehicle.fuel_efficiency && (
              <p className="inline-flex items-center px-1.5 py-0.5 border border-transparent text-xs font-medium rounded text-gray-700 bg-gray-100 whitespace-nowrap">
                {vehicle.fuel_efficiency.toFixed(2)} MPG
              </p>
            )}
          </div>
        </>
      </Modal>
    )
  }
}