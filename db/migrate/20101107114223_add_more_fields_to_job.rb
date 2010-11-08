class AddMoreFieldsToJob < ActiveRecord::Migration
  def self.up
    add_column :jobs, :created_date, :date
    add_column :jobs, :closed_date,  :date
    add_column :jobs, :position_type,:string
    add_column :jobs, :job_number,   :integer
    add_column :jobs, :requirement,  :string
    add_column :jobs, :state      ,  :string
  end

  def self.down
    remove_column :jobs, :created_date
    remove_column :jobs, :closed_date 
    remove_column :jobs, :position_type       
    remove_column :jobs, :job_number  
    remove_column :jobs, :requirement 
    remove_column :jobs, :state       
  end
end
