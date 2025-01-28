module Fleetio
  class FuelEfficiencyService
    class << self
      def call(vehicle)
        begin
          fuel_entries = Fleetio::Api::FuelEntriesService.call(vehicle)
          usage = fuel_entries.sum(0) { |fuel_entry| fuel_entry["usage_in_mi"]&.to_f || 0 }
          gallons = fuel_entries.sum(0) { |fuel_entry| fuel_entry["us_gallons"]&.to_f || 0 }
          usage.to_f / gallons
        rescue => e
          # We'd have logging in place here to ensure we're aware of any
          # potential issues with the api
          Rails.logger(e)
          return nil
        end
      end
    end
  end
end