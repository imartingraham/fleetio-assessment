import React, { useState } from "react"

type Props = {
  children: JSX.Element[] | JSX.Element | string
  showModal: boolean
  onClose: () => void
}

export const Modal = ({showModal, children, onClose}: Props) => {
  if(!showModal){
    return null
  }

  return (
    <div className="fixed insert-0 bg-gray-600 bg-opacity-60 overflow-y-auto h-full w-full z-50" id="modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={onClose}>
          <svg className="fill-current h-6 w-6 text-gray-400" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
        <div className="modal-body mt-5">
          {children}
        </div>
      </div>
    </div>
  )

}

