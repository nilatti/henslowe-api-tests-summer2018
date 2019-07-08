Rails.application.routes.draw do
  # devise_for :admin_users, ActiveAdmin::Devise.config
  devise_for :users, :controllers => {

   :registrations => "registrations",
   :sessions => "sessions"

   }
  ActiveAdmin.routes(self)
  scope 'api' do

    resources :users, only: [:index, :show, :update, :destroy]
    resources :jobs
    resources :specializations
    resources :productions do
      collection do
        get :production_names
      end
    end

    resources :theaters do
      collection do
        get :theater_names
      end
    end
    resources :spaces do
      collection do
        get :space_names
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
    resources :on_stages
  end
end
