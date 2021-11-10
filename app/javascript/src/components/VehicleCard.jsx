import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

import Button from "../ui/Button";

const cardItemSize = {
  width: 315,
  height: 192
}

const VehicleCard = ({ vehicle }) => {
  const [loading, setLoading] = useState(false);
  const [efficiency, setEfficiency] = useState();

  const calculateEfficiency = useCallback(() => {
    setLoading(true);

    fetch(`/vehicles/${vehicle.external_id}/fuel_entries`)
      .then((response) => response.json())
      .then((data) => {
        setEfficiency(data.efficiency.toFixed(2));
        setLoading(false);
      })
      .catch(() => {
        toast.error("Oops, something went wrong!");
        setLoading(false);
      });
  }, [vehicle]);

  return (
    <li className="relative" style={{ maxWidth: cardItemSize.width }}>
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

        {efficiency ? (
          <p className="inline-flex items-center px-1.5 py-0.5 border border-transparent text-xs font-medium rounded text-gray-700 bg-gray-100 whitespace-nowrap">
            {efficiency} MPG
          </p>
        ) : (
          <Button
            onClick={calculateEfficiency}
            theme="success"
            isLoading={loading}
          >
            {loading ? "Calculating..." : "Calculate"}
          </Button>
        )}
      </div>
    </li>
  );
};

VehicleCard.propTypes = {
  vehicle: PropTypes.object.isRequired,
};

export default VehicleCard;
