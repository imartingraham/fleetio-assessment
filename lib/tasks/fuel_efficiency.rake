namespace :fuel_efficiency do
  task update_vehicles: :environment do
    vehicles = Vehicle.where(fuel_efficiency: nil)

    vehicles.each do |v|
      efficiency = Fleetio::FuelEfficiencyService.call(v)
      v.update(fuel_efficiency: efficiency) if efficiency.present?
    end
  end
end