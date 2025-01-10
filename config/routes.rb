Rails.application.routes.draw do
  root(to: "home#index")

  resources(:vehicles, only: :index) do
    collection do
      get :lowest_efficiency
    end
    scope(module: :vehicles) do
      resources(:fuel_entries, only: :index)
    end
  end
end
