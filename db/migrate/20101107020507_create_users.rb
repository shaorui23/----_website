class CreateUsers < ActiveRecord::Migration
  def self.up
    create_table :users do |t|
        t.column  :uname,     :string
        t.column  :upassword, :string
        t.column  :uage,      :integer
        t.column  :usex,      :string
      t.timestamps
    end
  end

  def self.down
    drop_table :users
  end
end
