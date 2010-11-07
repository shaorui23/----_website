# lib/tasks/populate.rake
namespace :db do
  desc "创建虚拟数据，并迁移到数据库"
  task :populate => :environment do
    require 'populator'
    require 'faker'
    require 'randexp'
    
   # [Category, Product, Person].each(&:delete_all)
   Job.delete_all 
    
    
    Job.populate 10 do |job|
      job.jname            =   Faker::Lorem.words.first 
      job.jdesc            =   Faker::Lorem.sentence 
      job.created_date     =   Date.today 
      job.closed_date      =   2.years.ago..Time.now
     # job.type             =   Faker::Lorem.words.first
      job.job_number       =   [1,24,52]
      job.requirement      =   Faker::Lorem.sentence 
      job.state            =   Faker::Name.name
    end
  end
end


