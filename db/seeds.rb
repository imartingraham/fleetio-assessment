# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

vehicles = HTTP.headers(
  authorization: "Token #{Rails.application.credentials.dig(:fleetio, :api_token)}",
  "account-token": Rails.application.credentials.dig(:fleetio, :account_token)
).get(
  "https://secure.fleetio.com/api/v1/vehicles",
  params: {
    per: 20,
    "q[default_image_file_url_not_null]": 1,
    "q[s]": "created_at+asc"
  }
).parse

vehicles.each do |vehicle|
  Vehicle.find_or_create_by(
    external_id: vehicle["id"],
    name: vehicle["name"],
    image_url: vehicle["default_image_url_large"],
    category: vehicle["vehicle_type_name"]
  )
end
