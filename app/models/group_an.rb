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
  belongs_to :user
  belongs_to :group
  
  #返回全部的试卷的关联信息
  #conditions包含了查询要求和查询所需数据，为conditions = ['conditions', data]
  def self.paperInfo conditions = ['all']
    paperAns = GroupAn.find(:all, :order => 'id desc')
    paperAns = self.show_handler paperAns,conditions
    paInfo = []
    paperAns.each do |paperAn|
      paInfo.push({ 
        :id        => paperAn.id,
        :user_name => paperAn.user.login,
        :job_name  => paperAn.group.job.jname,
        :create_at => paperAn.created_at
      })
    end
    return paInfo
  end

  #根据条件返回合适的paper_answer
  #TODO: 未完成，目的是使其支持复合查询,需要查询的条件在问卷中心问卷审核中有
  def self.show_handler paperAns,conditions
    if conditions[0] == 'all'
        return paperAns
    elsif conditions == 'job'
        #puts 1
    end
  end
end
