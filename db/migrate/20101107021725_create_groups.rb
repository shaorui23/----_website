class CreateGroups < ActiveRecord::Migration
  def self.up
    create_table :groups do |t|
        t.column  :gque,    :string
        t.column  :job_id,  :integer
      t.timestamps
    end
  end

  def self.down
    drop_table :groups
  end
end
