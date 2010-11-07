class CreateGroupAns < ActiveRecord::Migration
  def self.up
    create_table :group_ans do |t|
        t.column  :gque_one,    :string
        t.column  :gque_two,    :string
        t.column  :gque_three,  :string
        t.column  :gque_four,   :string
        t.column  :gque_five,   :string
        t.column  :gque_six,    :string
        t.column  :gmark,       :integer
        t.column  :group_id,    :integer
        t.column  :user_id,     :integer
      t.timestamps
    end
  end

  def self.down
    drop_table :group_ans
  end
end
