# == Schema Information
#
# Table name: questions
#
#  id         :integer(4)      not null, primary key
#  qcon       :string(255)
#  qjug       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class Question < ActiveRecord::Base
end
