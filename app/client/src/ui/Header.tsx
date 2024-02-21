import React from "react";

// @ts-ignore
import FleetIcon from "../../images/fleetio-logo-mark-only.svg"

interface HeaderProps {
  headerText: string
}

export const Header = ({ headerText }: HeaderProps) => (
  <div className="flex justify-center align-center pt-8 md:pt-12">
    <img src={FleetIcon} className="h-8 w-auto sm:h-10" />
    <h1 className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl ml-2">
      {headerText}
    </h1>
  </div>
)
