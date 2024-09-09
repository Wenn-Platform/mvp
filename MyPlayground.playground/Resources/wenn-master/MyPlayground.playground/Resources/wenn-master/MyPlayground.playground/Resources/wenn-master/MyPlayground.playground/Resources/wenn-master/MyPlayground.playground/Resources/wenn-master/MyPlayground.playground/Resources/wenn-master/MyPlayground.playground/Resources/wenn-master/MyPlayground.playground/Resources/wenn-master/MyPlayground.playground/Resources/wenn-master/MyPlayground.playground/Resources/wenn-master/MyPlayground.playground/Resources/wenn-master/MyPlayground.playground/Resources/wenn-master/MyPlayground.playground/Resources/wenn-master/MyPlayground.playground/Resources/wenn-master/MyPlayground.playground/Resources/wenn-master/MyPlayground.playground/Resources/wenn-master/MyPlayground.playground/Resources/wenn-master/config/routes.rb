Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'pages#index'

  # necessary to namespace devise separately otherwise the devise
  # user object gets namespaced as well
  namespace :api, as: nil do
    namespace :v1, as: nil do
      devise_for :users,
        defaults: { format: :json },
        controllers: {
          sessions: 'api/v1/sessions',
          registrations: 'api/v1/registrations',
          passwords: 'api/v1/passwords',
          confirmations: 'api/v1/confirmations'
      }
    end
  end

  namespace :api, defaults: { format: :json }, constraints: { format: :json } do
    namespace :v1 do
      devise_scope :user do
        get :users, to: 'users#show'
      end

      resources :companies, only: [:index, :show]
      resources :job_descriptions, only: [:index, :show]
    end
  end

  get '*path' => 'pages#index'
end
