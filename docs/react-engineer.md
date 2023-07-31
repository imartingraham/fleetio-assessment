# React Engineer

## Instructions

1. There is a bug with the efficiency calculation in the `Vehicles/FuelEntriesController`. You can easily see the
   exception when you click "Calculate" on one of the vehicles in the UI. Let's fix this bug.

2. Refactor the `VehicleCard` component to make use of a more generic, underlying `Card` component.

4. Lastly, we have been running into some performance issues with the `ReactDebuggingAndPerformance.tsx` page,
   where re-renders for customers with many vehicles is laggy. Fix some of the issues you find as well as implement
   a `windowing` or virtualized list solution to the `ReactDebuggingAndPerformance.tsx` list (the `TopMileageVehicles` component is where the list lives currently). This means that only rows in the active "scroll view" should be rendered to the DOM/React tree, and things above and below "scroll view" should have a placeholder to retain scroll position and make the scrolling feel natural.

   **Note:** We are looking for your Javascript/React chops here, avoid including any open source libraries to solve this.

   **Hints/Guidance:** In general, the way virtualized lists work is by having a container element with a fixed height
                   above and below the visible content. This needs to take into account the (at least, approximate)
                   "amount" of scroll space that would be above/below the visible content, which gives the illusion of
                   having a fully rendered list.

NOTE: Tailwind is loaded, so you can use its classes however you like. To access the "React Page", you can click the "Show React Page" button at the bottom of the main app Index page. Feel free to just comment out the other index/adjust the logic so that you don't have to click this every time you refresh the page.

### Typescript Questions
1. In `utilityTypes.ts` define a type that allows you to make only SOME properties optional.
2. Write a higher order function that takes some type that `extends { value: string }` and
   returns a new type that no longer has the `value` property, but all the other properties
   of that type.
