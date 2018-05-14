Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :friendships, only: [:index, :create]
    resource :friendship, only: [:destroy]
    resources :bills, only: [:index, :create, :update, :destroy]
    resources :bill_splits, only: [:index, :create]
    resource :bill_splits, only: [:update]
    resources :payments, only: [:index, :create]
    resource :payments, only: [:update]
  end
end
