module Fleetio::Api
  class FuelEntriesService < BaseService
    class << self

      def call(vehicle)
        JSON.parse(get(data: build_params(vehicle)))
      end

      def build_params(vehicle)
        {
          "q[vehicle_id_eq]": vehicle.external_id,
          "q[s]": "created_at+desc"
        }
      end

      def path
        "fuel_entries"
      end
    end
  end
end