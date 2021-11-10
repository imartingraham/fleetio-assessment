class VehiclesController < ApplicationController
  def index
    @vehicles = Vehicle.order(category: :asc)
  end
end
