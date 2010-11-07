class CreateGroupQuestions < ActiveRecord::Migration
  def self.up
    create_table :group_questions do |t|
        t.column  :group_id,     :integer
        t.column  :question_id,  :integer
      t.timestamps
    end
  end

  def self.down
    drop_table :group_questions
  end
end
