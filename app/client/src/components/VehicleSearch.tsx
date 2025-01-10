import React, {useState, useCallback} from "react"


// This was pulled an modified from a StackOverflow thread here: https://stackoverflow.com/a/75988895
// In a fulfledged app we could probably justify pulling in somethign like lodash
// or similar utilities where we would be using more than just a single function
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
  const [value, setValue] = useState<string>("")
  // We don't want to make a request on every key press of the search so we'll
  // delay the search once there's a half second pause between key presses
  const debouncedOnSearch = useCallback(debounce((val: string) => {
    // one decision that needed to be made here was how many characters should
    // be typed before executing the search function. I've always felt like 3
    // was a standard. I decided to leave that logic to the `onSearch` function
    // rather than make that decision here.
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