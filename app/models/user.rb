# == Schema Information
#
# Table name: users
#
#  id         :integer(4)      not null, primary key
#  uname      :string(255)
#  upassword  :string(255)
#  uage       :integer(4)
#  usex       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class User < ActiveRecord::Base
end
