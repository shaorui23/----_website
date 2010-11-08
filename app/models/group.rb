# == Schema Information
#
# Table name: groups
#
#  id         :integer(4)      not null, primary key
#  gque       :string(255)
#  job_id     :integer(4)
#  created_at :datetime
#  updated_at :datetime
#

class Group < ActiveRecord::Base
    has_and_belongs_to_many :questions
end
