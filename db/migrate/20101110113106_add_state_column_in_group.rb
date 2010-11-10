class AddStateColumnInGroup < ActiveRecord::Migration
  def self.up
    add_column :groups, :active, :boolean, :default => false
  end

  def self.down
    remove_column :groups, :active
  end
end
