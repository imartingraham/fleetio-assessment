import React, {useState, useCallback} from 'react'


const debounce = (callback: Function, wait: number) => {
  let timeoutId: number
  return (text: string) => {
      clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      callback(text)
    }, wait)
  }
}

interface VehicleSearchProps {
  onSearch: (term: string) => void
}

export const VehicleSearch = ({onSearch}: VehicleSearchProps) => {
  const [value, setValue] = useState<string>('')
  const debouncedOnSearch = useCallback(debounce((val: string) => {
      onSearch(val)
  }, 500), [onSearch])

  return (
      <form>
        <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
          <input
            id="search"
            name="search"
            type="search"
            placeholder="Search by vehicle name"
            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
            value={value}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
              setValue(evt.target.value)
              debouncedOnSearch(evt.target.value)
            }}
          />
        </div>
      </form>

  )
}