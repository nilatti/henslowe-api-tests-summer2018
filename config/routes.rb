Rails.application.routes.draw do
  mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'

  # devise_for :admin_users, ActiveAdmin::Devise.config

  ActiveAdmin.routes(self)
  scope 'api' do

  devise_for :users,
             path: '',
             controllers: {
               sessions: 'sessions',
               registrations: 'registrations'
             }
  ActiveAdmin.routes(self)
  scope 'api' do

    post "/graphql", to: "graphql#execute"
    resources :users, only: [:index, :show, :update, :destroy] do
      resources :conflicts
    end
    resources :jobs do
      collection do
        get :get_actors_for_production
        get :get_actors_and_auditioners_for_production
        get :get_actors_and_auditioners_for_theater
      end
    end
    resources :specializations
    resources :productions do
      resources :rehearsals
      member do
        put :build_rehearsal_schedule
      end
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
      resources :conflicts
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
      member do
        get :play_script
        get :play_skeleton
      end
      member do
        get :play_act_on_stages
        get :play_french_scene_on_stages
        get :play_on_stages
        get :play_scene_on_stages
      end
      resources :acts do
        resources :scenes
      end
      resources :characters
    end
    resources :acts do
      member do
        get :act_script
      end
      resources :scenes
    end
    resources :characters
    resources :scenes do
      collection do
        get :scene_script
      end
      resources :french_scenes
    end
    resources :french_scenes do
      collection do
        get :french_scene_script
      end
      resources :entrance_exits
      resources :on_stages
    end
    resources :character_groups
    resources :conflicts
    resources :entrance_exits
    resources :labels
    resources :lines
    resources :on_stages
    resources :rehearsals
    resources :sound_cues
    resources :stage_directions
    resources :words
    resources :rehearsals
    resources :conflicts
  end
end
