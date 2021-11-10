# Product Engineer

## Instructions

1. Right now, the `Vehicles/FuelEntriesController` communicates with the
   Fleetio API. We don't love that, so let's move it into a PORO. Consider
   splitting the API communication and fuel efficiency into separate services.

2. There is also a bug with the efficiency calculation. You can easily see the
   exception when you click "Calculate" on one of the vehicles in the UI.
   Let's fix this bug.

3. Make sure to handle edge cases when communicating with the Fleetio API.
   Hint: consider non-200 responses, timeouts, etc.

4. Now that you fixed the efficiency calculation in step #2 above, let's
   persist that value in the database so we don't need to continue to make
   API requests from the UI.

5. On the `VehiclesController`, let's group the vehicles by their respective
   `category`. You're welcome to perform the grouping on the Rails-side or the
   React-side. The final product should look something like the screenshot below.

6. Refactor the `VehicleCard` component to make use of a more generic underlying
   `Card` component.

## Bonus

1. On the Rails-side, parse the Fleetio API and turn the hashes into objects.

2. On the front-end, persist the most recently fetched Vehicle data to local
   storage and hydrate the app state from local storage on a fresh page load.

   ![FINAL](../.github/final.png)
