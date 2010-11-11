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
# Associations:
#  questions  :has_and_belongs [Question(group_id)] 
#

class Group < ActiveRecord::Base
  has_and_belongs_to_many :questions
  belongs_to :job
  
  named_scope :actives, :conditions => { :active => true }
  

  #返回职位一样的paper
  def self.job_samer job_id
    Group.find(:all, :conditions => { :job_id => job_id })
  end

  #将职位相同的paper的active全部置为false
  def self.job_unactivelize job_id
    papers = Group.job_samer job_id
    papers.delete_if { |paper| paper.active == false }
    papers.each do |paper|
      paper.update_attributes({ :active => false })
    end
  end
end
