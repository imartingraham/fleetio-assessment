export interface DebuggingVehicle {
  id: number
  miles: number
}

function generateDebuggingVehicles(num: number): DebuggingVehicle[] {
  const data: DebuggingVehicle[] = []
  for (let i = 0; i < num; i++) {
    data.push({
      id: i,
      miles: Math.floor(Math.random() * 50000)
    })
  }
  return data
}

interface FetchVehiclesQueryParams {
  // pretend this is used
  per: number
}

/**
 * Don't worry about the implementation here.
 */
export function fetchVehicles({ per }: FetchVehiclesQueryParams): Promise<DebuggingVehicle[]> {
  return new Promise(
    (resolve) =>
      setTimeout(() =>
        resolve(generateDebuggingVehicles(per)),
        100
      )
  )
}
