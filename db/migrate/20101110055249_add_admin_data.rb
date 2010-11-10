class AddAdminData < ActiveRecord::Migration
  def self.up
    User.delete_all
    User.create(
      :login => "wando", 
      :password => "hzuhzu", 
      :password_confirmation => "hzuhzu", 
      :remember_token => "hr", 
      :email => "wandoformouse@gmail.com"
    )
  end

  def self.down
    User.delete_all
  end
end
