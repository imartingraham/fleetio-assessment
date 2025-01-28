class AddFuelEfficiencyToVehicles < ActiveRecord::Migration[7.0]
  def change
    add_column :vehicles, :fuel_efficiency, :decimal
  end
end
