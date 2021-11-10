Rails.application.routes.draw do
  root(to: "home#index")

  resources(:vehicles, only: :index) do
    scope(module: :vehicles) do
      resources(:fuel_entries, only: :index)
    end
  end
end
