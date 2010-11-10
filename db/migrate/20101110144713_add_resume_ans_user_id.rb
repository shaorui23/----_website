class AddResumeAnsUserId < ActiveRecord::Migration
  def self.up
    add_column :resume_ans, :user_id, :integer
  end

  def self.down
    remove_column :resume_ans,  :user_id
  end
end
