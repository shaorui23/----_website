# == Schema Information
#
# Table name: resume_ans
#
#  id         :integer(4)      not null, primary key
#  rexp_a     :string(255)
#  redu_a     :string(255)
#  rskill_a   :string(255)
#  reva_a     :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class ResumeAns < ActiveRecord::Base
end
