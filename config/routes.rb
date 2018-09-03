Rails.application.routes.draw do

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  scope 'api' do

    resources :theaters
    resources :authors do
      resources :plays
    end
    resources :plays do
      resources :acts
    end
    resources :acts
  end
end
