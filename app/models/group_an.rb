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
# Associations:
#  group      :belongs_to      Group
#              by              group_id 
#  user       :belongs_to      User
#              by              user_id 
#

class GroupAn < ActiveRecord::Base
  belongs_to :user
  belongs_to :group
  
  # 返回全部的试卷的关联信息
  # conditions包含了查询要求和查询所需数据，为conditions = ['conditions', data]
  def self.paperInfo conditions = 'all'
    paperAns = GroupAn.find(:all, :order => 'id desc')
    paperAns = self.show_handler paperAns, conditions
    paInfo = []
    paperAns.each do |paperAn|
      paInfo.push({ 
        :id        => paperAn.id,
        :user_name => paperAn.user.login,
        :job_name  => paperAn.group.job.jname,
        :create_at => paperAn.created_at,
        :mark      => paperAn.gmark
      })
    end
    return paInfo
  end

  # 根据条件返回合适的paper_answer
  def self.show_handler paperAns, conditions
    if conditions == 'all'
      return paperAns
    else
      # 判断job_id
      if conditions[:job_id] != 'No Limit'
        paperAns.delete_if { |paperAn| paperAn.group.job_id != conditions[:job_id] }
      end

      # 判断read_id
      if conditions[:read_id] == 1
        paperAns.delete_if { |paperAn| paperAn.gmark != nil }
      elsif conditions[:read_id] == 2
        paperAns.delete_if { |paperAn| paperAn.gmark == nil }
      end

      return paperAns
    end
  end
end
