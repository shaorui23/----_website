class CreateResumeAns < ActiveRecord::Migration
  def self.up
    create_table :resume_ans do |t|
        t.column  :rexp_a,    :string
        t.column  :redu_a,    :string
        t.column  :rskill_a,  :string
        t.column  :reva_a,    :string
      t.timestamps
    end
  end

  def self.down
    drop_table :resume_ans
  end
end
