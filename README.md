# Fleet Code

This is a simple application, used as an assessment for prospective engineers,
that queries the [Fleetio API](https://developer.fleetio.com) for vehicles.

## Setup

1. Fork the repository.
2. Create `config/master.key` file and add key from Fleetio.
3. Install missing dependencies.

   ```bash
   $ bin/setup
   ```

4. Run the application!

   ```bash
   $ bin/rails server
   $ yarn build --watch
   ```

5. Alternatively, you can use Docker to setup and run the application:

    ```bash
    $ docker compose build
    $ docker compose run --rm runner bin/setup
    $ docker compose up
    ```

6. When you have completed your assessment, open a PR with your changes against your own local fork (not the fleetio/fleetio-web-assessment base repository), then add @jorgevaldivia, @senthil0101, @hamfz, @philcoggins, @hpjaj, @ryoung, and @aloftin as collaborators to the repository for review.

## Instructions

| Product Engineer | React Engineer | API Engineer |
| ---------------- | -------------- | ------------ |
| [Link to Instructions](./docs/product-engineer.md) | [Link to Instructions](./docs/react-engineer.md) | [Link to Instructions](./docs/api-engineer.md) |
