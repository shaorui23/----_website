# == Schema Information
#
# Table name: jobs
#
#  id           :integer(4)      not null, primary key
#  jname        :string(255)
#  jdesc        :string(255)
#  created_at   :datetime
#  updated_at   :datetime
#  created_date :date
#  closed_date  :date
#  type         :string(255)
#  job_number   :date
#  requirement  :date
#  state        :string(255)
#

class Job < ActiveRecord::Base
end


Job.blueprint do  
  jname               { Faker::Lorem.words.first }
  jdesc               { Faker::Lorem.sentence }
  created_date        { Date.today }
  closed_date         { rand(100) + 20}
  type                { /'jingli'|'sdf'/.gen }
  job_number          { rand(100) + 20} 
  requirement         { Faker::Lorem.sentence }
  state               { /'pending'|'closing'|'over'/.gen }
end
