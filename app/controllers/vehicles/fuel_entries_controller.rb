module Vehicles
  class FuelEntriesController < ApplicationController
    before_action(:set_vehicle)

    def index
      fuel_entries = HTTP.headers(
        authorization: "Token #{Rails.application.credentials.dig(:fleetio, :api_token)}",
        "account-token": Rails.application.credentials.dig(:fleetio, :account_token)
      ).get(
        "https://secure.fleetio.com/api/v1/fuel_entries",
        params: {
          "q[vehicle_id_eq]": @vehicle.external_id,
          "q[s]": "created_at+desc"
        }
      ).parse

      usage = fuel_entries.sum(0) { |fuel_entry| fuel_entry["usage_in_mi"] }
      gallons = fuel_entries.sum(0) { |fuel_entry| fuel_entry["us_gallons"] }

      render json: { efficiency: usage.to_f / gallons }
    end

    private

    def set_vehicle
      @vehicle = Vehicle.find_by!(external_id: params[:vehicle_id])
    end
  end
end
