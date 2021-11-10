# React Engineer

## Instructions

1. There is a bug with the efficiency calculation in the `Vehicles/FuelEntriesController`. You can easily see the
   exception when you click "Calculate" on one of the vehicles in the UI.
   Let's fix this bug.

2. Now that you fixed the efficiency calculation in step #1 above, add the following:
   When a user calculates efficiency, store the values to localstorage and have the `VehicleCard`
   re-hydrate the value from localstorage, then add a `Recalculate Efficiency` feature for Vehicles where the efficiency has been previously fetched.

3. Refactor the `VehicleCard` component to make use of a more generic underlying
   `Card` component.

4. Lastly, we have been running into some performance issues with
   the `VehiclesIndex` rendering for some customers on older machines. Implement
   a `windowing` or virtualized list solution to the Vehicle Card list. This means that only the VehicleCards in the active "scroll view" should be rendered to the DOM/React tree, and things above and below "scroll view" should have a placeholder to retain scroll position and make the scrolling feel natural.
   Note: We are looking for your Javascript chops here, avoid including any open source libraries to solve this.
