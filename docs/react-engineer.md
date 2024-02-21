# React Engineer

## Instructions

1. We have been running into some performance issues with the `ReactDebuggingAndPerformance.tsx` page,
   where re-renders for customers with many vehicles is laggy. To access the "React Page", you can click the "Show React Page" button at the bottom of the main app Index page.
   
   In general there are some optimizations and potential fixes that can be made to this page to look out for. However, we are specifically interested in you adding a `windowing` or virtualized list solution to the `ReactDebuggingAndPerformance.tsx` list (the `TopMileageVehicles` component is where the list lives currently). This means that only rows in the scrollable parent that are currently "in view" should be rendered to the DOM/React tree, and things above and below "scroll view" should have a placeholder to retain scroll position and make the scrolling feel natural.

   **Note:** We are looking for your Javascript/React chops here, avoid including any open source libraries to solve this. 

2. Return to the main `VehiclesIndex` page. There is a bug with the efficiency calculation in the `Vehicles/FuelEntriesController`. You can easily see the exception in the Rails server log when you click a "Calculate" button on one of the vehicles in the UI. Let's fix this bug.

3. Lastly, refactor `VehicleCard` to extract a more generic `Card` implementation for the `/ui` component library. This will allow us to reuse the card component in other places in the app.
