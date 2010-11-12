class Jobtype < ActiveRecord::Base

 has_many :jobs 

  def self.for_select
    r = []
    self.all.each { |jobtype| r << { :id => jobtype.id.to_s , :job_type => jobtype.job_type } }
    r
  end

end
