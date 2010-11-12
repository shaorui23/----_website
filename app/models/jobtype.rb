# == Schema Information
#
# Table name: jobtypes
#
#  id         :integer(4)      not null, primary key
#  job_type   :string(255)
#  created_at :datetime
#  updated_at :datetime
#
# Associations:
#  jobs       :has_many        [Job(jobtype_id)] 
#

class Jobtype < ActiveRecord::Base

 has_many :jobs 

  def self.for_select
    r = []
    self.all.each { |jobtype| r << { :id => jobtype.id.to_s , :job_type => jobtype.job_type } }
    r
  end

end
