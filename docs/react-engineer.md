# React Engineer

## Instructions

NOTE: tailwind is loaded, so you can use its classes however you like.

1. There is a bug with the efficiency calculation in the `Vehicles/FuelEntriesController`. You can easily see the
   exception when you click "Calculate" on one of the vehicles in the UI.
   Let's fix this bug.

2. Now that you fixed the efficiency calculation in step #1 above, add the following:
   Create a hook (`useLocalStorage.ts`) that allows you to store values to local storage (use typescript) and
   when a user calculates efficiency, store the values with the hook and have the `VehicleCard`
   re-hydrate the value from local storage, then add a `Recalculate Efficiency` feature for Vehicles
   where the efficiency has been previously fetched.

3. Refactor the `VehicleCard` component to make use of a more general, underlying `Card` component.
   The more general card component can have the same layout as `VehicleCard`, but the `name`, `tag`
   (e.g., "truck"), and right content (e.g., `calculate/recalculate`button) should be props available 
   to the `Card` component, that are passed in as a value or as a function to retrieve them.
   `data` should also be provided to the card. Use your typescript skills for this!

4. Lastly, we have been running into some performance issues with
   the `VehiclesIndex` rendering for some customers on older machines. Implement
   a `windowing` or virtualized list solution to the Vehicle Card list. This means that only the VehicleCards in the active "scroll view" should be rendered to the DOM/React tree, and things above and below "scroll view" should have a placeholder to retain scroll position and make the scrolling feel natural.
   Note: We are looking for your Javascript chops here, avoid including any open source libraries to solve this.

## Bonus

### React / Performance / Debugging
1. Take a look at `./app/client/src/bonus/ReactDebuggingAndPerformance.tsx` and fix some bugs in the component.

### Typescript Questions
1. In `utilityTypes.ts` define a type that allows you to make only SOME properties optional.
2. Write a higher order function that takes some type that `extends { value: string }` and
   returns a new type that no longer has the `value` property, but all of the other properties
   of that type.