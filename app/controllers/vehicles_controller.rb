class VehiclesController < ApplicationController
  def index
    term = search_params.dig(:search)
    @vehicles = Vehicle.order(category: :asc)
    if term.present?
      @vehicles = @vehicles.where("name LIKE ?", "%#{term}%")
    end
  end

  def lowest_efficiency
    @vehicle = Vehicle.where.not(fuel_efficiency: [nil, 0]).order(fuel_efficiency: :asc).first
  end

  def search_params
    params.permit(:search)
  end
end
