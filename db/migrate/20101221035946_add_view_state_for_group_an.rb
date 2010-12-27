class AddViewStateForGroupAn < ActiveRecord::Migration
  def self.up
    add_column :group_ans, :state , :string
  end

  def self.down
    remove_column :group_ans, :state
  end
end
