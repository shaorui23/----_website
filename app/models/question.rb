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
    has_and_belongs_to_many :groups

    validates_presence_of :qcon
end
