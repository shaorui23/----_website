class CreateJobtypes < ActiveRecord::Migration
  def self.up
    create_table :jobtypes do |t|
      t.string :job_type

      t.timestamps
    end
  end

  def self.down
    drop_table :jobtypes
  end
end
