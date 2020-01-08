Rails.application.routes.draw do
  resources :stage_directions
  # devise_for :admin_users, ActiveAdmin::Devise.config
  devise_for :users, :controllers => {

   :registrations => "registrations",
   :sessions => "sessions"

   }
  ActiveAdmin.routes(self)
  scope 'api' do

    resources :users, only: [:index, :show, :update, :destroy]
    resources :jobs do
      collection do
        get :get_actors_for_production
        get :get_actors_and_auditioners_for_production
        get :get_actors_and_auditioners_for_theater
      end
    end
    resources :specializations
    resources :productions do
      resources :stage_exits
      collection do
        get :production_names
        get :get_productions_for_theater
      end
    end
    resources :stage_exits

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
        get :play_script
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
    resources :french_scenes do
      resources :entrance_exits
      resources :on_stages
    end
    resources :on_stages
    resources :entrance_exits
    resources :words
    resources :labels
    resources :sound_cues
    resources :lines
    resources :character_groups
  end
end
