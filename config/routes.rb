Rails.application.routes.draw do

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  scope 'api' do
    resources :plays do
      resources :acts
    end

    resources :theaters

    resources :authors do
      resources :plays
    end
  end
end
