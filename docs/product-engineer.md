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

## Additional Requirements
Add one or more of the following features depending on directions from recruiter/hiring manager:

A. When a visitor lands on the application for the first time, pop up a modal highlighting the vehicle with the lowest MPG and along with some type of
   "notice" or "warning" message. This modal should not pop up more than once for a given user.

B. Refactor the `VehicleCard` component to make use of a more generic underlying
   `Card` component.

C. The vehicles in this project are seeded with data from the [Fleetio API](https://developer.fleetio.com/docs/api/v-1-vehicles-index). Using the API documentation, identify some more key
  attributes of the vehicle to collect and display to the user. Allow the user to select a vehicle tile, upon selection they should be linked to a vehicle profile page that displays these new vehicle attributes.
  The user should be able to navigate back to the original list page.

D. Using the Fleetio [Meter Entry API](https://developer.fleetio.com/docs/api/v-1-meter-entries-index), create a process to collect and store meter history for each vehicle. Create a new controller that returns this history for a given vehicle. Any voided meters should not be persisted. When a user clicks on a vehicle tile, pop up a simple modal that loads and lists the meter history. Note, you may find the filtering/sorting API useful (https://developer.fleetio.com/docs/guides/filtering-and-sorting/constructing-filters-and-sorts) for this.

E. Add a simple "Search form" to the top of the vehicle listing page. When submitted, the app should query the vehicle controller and only return vehicles who's name contains the search string. Update the list view accordingly depending on the results.


   ![FINAL](../.github/final.png)
