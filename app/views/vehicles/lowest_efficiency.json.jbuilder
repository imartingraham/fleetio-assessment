json.extract!(@vehicle, :id, :name, :image_url, :category, :external_id)
json.fuel_efficiency @vehicle.fuel_efficiency.to_f