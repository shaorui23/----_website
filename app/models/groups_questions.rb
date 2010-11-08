# == Schema Information
#
# Table name: group_questions
#
#  id          :integer(4)      not null, primary key
#  group_id    :integer(4)
#  question_id :integer(4)
#  created_at  :datetime
#  updated_at  :datetime
#

class GroupsQuestions < ActiveRecord::Base
end
