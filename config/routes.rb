ActionController::Routing::Routes.draw do |map|
  map.resources :jobtypes,
    :collection => { 
      :for_select => :get
    }

  map.resources :homes
  map.resources :interviews
  map.resources :logins
  map.resources :employs
  map.resources :viewmarks
  map.resources :myteams
  map.resources :accounts
  map.resources :jobs,
    :member => { 
      :get_job => :get,
      :push_job => :put,
      :show_group => :get,
      :delete_all => :post
    },
    :collection => { 
      :all_jobs => :get,
      :search_job_number => :get
    }
  map.resources :manage,
                :collection => {
                  :edit_resume => :get,
                  :resume_an =>:get,
                  :find_resume_an => :get,
                  :create_resume => :post,
                  :update_resume => :put,
                  :query =>:get,
                }
  map.resources :manage
  map.resources :papers, 
                :collection => { 
                  :show_questions  => :get,
                  :be_active       => :post,
                  :be_unactive     => :post,
                  :search_by_job   => :get
                }
  map.resources :questions, 
                :collection => { 
                  :deletes        => :delete,
                  :search_by_qcon => :get,
                }
  map.resources :persons
  map.resources :paper_answers,
                :collection => { 
                  :show_p_and_a      => :get,
                  :give_mark         => :post,
                  :give_evaluate     => :post,
                  :employ            => :post,
                  :search_limit      => :get
                }
  # The priority is based upon order of creation: first created -> highest priority.

  # Sample of regular route:
  #   map.connect 'products/:id', :controller => 'catalog', :action => 'view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   map.purchase 'products/:id/purchase', :controller => 'catalog', :action => 'purchase'
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   map.resources :products

  # Sample resource route with options:
  #   map.resources :products, :member => { :short => :get, :toggle => :post }, :collection => { :sold => :get }

  # Sample resource route with sub-resources:
  #   map.resources :products, :has_many => [ :comments, :sales ], :has_one => :seller
  
  # Sample resource route with more complex sub-resources
  #   map.resources :products do |products|
  #     products.resources :comments
  #     products.resources :sales, :collection => { :recent => :get }
  #   end

  # Sample resource route within a namespace:
  #   map.namespace :admin do |admin|
  #     # Directs /admin/products/* to Admin::ProductsController (app/controllers/admin/products_controller.rb)
  #     admin.resources :products
  #   end

  # You can have the root of your site routed with map.root -- just remember to delete public/index.html.
  # map.root :controller => "welcome"

  # See how all your routes lay out with "rake routes"

  # Install the default routes as the lowest priority.
  # Note: These default routes make all actions in every controller accessible via GET requests. You should
  # consider removing or commenting them out if you're using named routes and resources.
  map.home '', :controller => "homes", :action => "index"
  map.connect ':controller/:action'
  map.connect ':controller/:action.:format'
  map.connect ':controller/:action/:id'
  map.connect ':controller/:action/:id.:format'
end
