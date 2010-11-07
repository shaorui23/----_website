# == Schema Information
#
# Table name: group_ans
#
#  id         :integer(4)      not null, primary key
#  gque_one   :string(255)
#  gque_two   :string(255)
#  gque_three :string(255)
#  gque_four  :string(255)
#  gque_five  :string(255)
#  gque_six   :string(255)
#  gmark      :integer(4)
#  group_id   :integer(4)
#  user_id    :integer(4)
#  created_at :datetime
#  updated_at :datetime
#

class GroupAn < ActiveRecord::Base
end
