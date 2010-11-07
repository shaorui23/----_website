# == Schema Information
#
# Table name: resumes
#
#  id         :integer(4)      not null, primary key
#  rexp       :string(255)
#  redu       :string(255)
#  rskill     :string(255)
#  reva       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class Resume < ActiveRecord::Base
end
