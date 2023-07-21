# API Engineer

## Instructions

Develop an external-facing, JSON API for querying the vehicles that were added when seeding your database.

1. The API should expose a single list / index endpoint at `GET /api/vehicles`.

2. Create another endpoint where a token can be obtained at `POST /api/token`. The token should be securely generated, persisted to the database, and valid for 24 hours. The token is required to access the list endpoint.

3. Add the ability to filter vehicles by `name` and `category` in your list endpoint. The filtering should support both exact and partial matching.

4. Add the ability to filter vehicles with a `created_at` or `updated_at` timestamps greater than or less than a given timestamp.

5. Add the ability to sort by any of the fields in the list endpoint.

We're looking for well-architected solutions that would be easily applied to new endpoints or allow for additional filters or sorting parameters on existing endpoints.

You should plan to document how your API works, a .md file added to the repository is fine.

While testing of the API is not required, it is recommended so that we can get at least a basic understanding of your testing philosophy.
