# Engineering Manager

## Instructions

1. Right now, the `Vehicles/FuelEntriesController` communicates with the
   Fleetio API. We don't love that, so let's move it into a PORO. Consider
   splitting the API communication and fuel efficiency into separate services.

2. There is also a bug with the efficiency calculation. You can easily see the
   exception when you click "Calculate" on one of the vehicles in the UI.
   Let's fix this bug.

3. Make sure to handle edge cases when communicating with the Fleetio API.
   Hint: consider non-200 responses, timeouts, etc.

4. On the `VehiclesController`, let's group the vehicles by their respective
   `category`. You're welcome to perform the grouping on the Rails-side or the
   React-side. The final product should look something like the screenshot below.

5. Refactor the `VehicleCard` component to make use of a more generic underlying
   `Card` component.

   ![FINAL](../.github/final.png)
 