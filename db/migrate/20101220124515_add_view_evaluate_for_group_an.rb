class AddViewEvaluateForGroupAn < ActiveRecord::Migration
  def self.up
    add_column :group_ans, :evaluate , :string
  end

  def self.down
    remove_column :group_ans, :evaluate
  end
end
