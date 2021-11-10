json.array!(@vehicles) do |vehicle|
  json.extract!(vehicle, :id, :name, :image_url, :category, :external_id)
end
