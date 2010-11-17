class AddFieldsToJob < ActiveRecord::Migration
  def self.up
    add_column :jobs, :salary, :integer
    add_column :jobs, :experience, :string
    add_column :jobs, :education, :string
  end

  def self.down
    remove_column :jobs, :salary
    remove_column :jobs, :experience
    remove_column :jobs, :education
  end
end
