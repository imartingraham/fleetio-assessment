import React from "react";

interface SubHeaderProps {
  content: React.ReactNode
}

export function SubHeader({ content }: SubHeaderProps) {
  return (
    <h2 className="text-lg text-center tracking-tight font-extrabold text-gray-900 sm:text-xl md:text-xl">
      {content}
    </h2>
  )
}