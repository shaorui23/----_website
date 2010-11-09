class ChangeColumnInResume < ActiveRecord::Migration
  def self.up
      change_column :resumes,  :rbirth,  :string
  end

  def self.down
      change_column :resumes,  :rbirth,  :date
  end
end
