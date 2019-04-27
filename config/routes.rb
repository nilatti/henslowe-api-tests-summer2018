Rails.application.routes.draw do

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  scope 'api' do
    resources :theaters do
      collection do
        get :theater_names
      end
    end
    resources :authors do
      collection do
        get :author_names
      end
      resources :plays
    end
    resources :plays do
      collection do
        get :play_titles
      end
      resources :acts do
        resources :scenes
      end
      resources :characters
    end
    resources :acts do
      resources :scenes
    end
    resources :characters
    resources :scenes do
      resources :french_scenes
    end
    resources :french_scenes
  end
end
