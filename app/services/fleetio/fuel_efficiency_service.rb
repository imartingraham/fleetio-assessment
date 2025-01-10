module Fleetio
  class FuelEfficiencyService
    class << self
      def call(vehicle)
        fuel_entries = Fleetio::Api::FuelEntriesService.call(vehicle)
        usage = fuel_entries.sum(0) { |fuel_entry| fuel_entry["usage_in_mi"]&.to_f || 0 }
        gallons = fuel_entries.sum(0) { |fuel_entry| fuel_entry["us_gallons"]&.to_f || 0 }
        usage.to_f / gallons
      end
    end
  end
end