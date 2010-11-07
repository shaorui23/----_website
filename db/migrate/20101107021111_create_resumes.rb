class CreateResumes < ActiveRecord::Migration
  def self.up
    create_table :resumes do |t|
        t.column  :rexp,    :string
        t.column  :redu,    :string
        t.column  :rskill,  :string
        t.column  :reva,    :string
      t.timestamps
    end
  end

  def self.down
    drop_table :resumes
  end
end
