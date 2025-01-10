module Vehicles
  class FuelEntriesController < ApplicationController
    before_action(:set_vehicle)

    def index
      # I created a rake task to populate the fuel efficiency values which 
      # would run on a cron or be called when new vehicles are added. I'm leaving this
      # here to allow us to catch any that may be missed.
      if @vehicle.fuel_efficiency.blank?
        efficiency = Fleetio::FuelEfficiencyService.call(@vehicle)
        @vehicle.update(fuel_efficiency: efficiency)
      end
      render json: { efficiency:  @vehicle.fuel_efficiency.to_f}
    end

    private

    def set_vehicle
      @vehicle = Vehicle.find_by!(external_id: params[:vehicle_id])
    end
  end
end
