# lib/tasks/populate.rake
namespace :db do
  desc "创建虚拟数据，并迁移到数据库"
  task :populate => :environment do
    require 'populator'
    require 'faker'
    require 'randexp'
    
   # [Category, Product, Person].each(&:delete_all)
    
    [Job, ResumeAns].each(&:delete_all)
    
    Job.populate 10 do |job|
      job.jname            =   Faker::Lorem.words.first 
      job.jdesc            =   Faker::Lorem.sentence 
      job.created_date     =   Date.today 
      job.closed_date      =   2.years.ago..Time.now
      job.jobtype_id       =   1
      job.job_number       =   [1,24,52]
      job.requirement      =   Faker::Lorem.sentence 
      job.state            =   Faker::Name.name
    end

      ResumeAns.populate 50 do |resume_ans|
        resume_ans.user_id          = 1
        resume_ans.rexp_a           = Faker::Lorem.sentence
        resume_ans.redu_a           = Faker::Lorem.words.first
        resume_ans.rskill_a         = Faker::Lorem.words.first
        resume_ans.created_at       = Time.now   
        resume_ans.updated_at       = Time.now   
        resume_ans.rname_a          = Faker::Lorem.words.first
        resume_ans.rsex_a           = ['m','g']
        resume_ans.rbirth_a         = Date.today
        resume_ans.rmari_sta_a      = ['yes','no']
        resume_ans.rrace_a          = Faker::Lorem.words.first
        resume_ans.rblood_a         = ['A','B','O','AB']
        resume_ans.rhei_a           = ['1.50','1.60','1.70','1.80']
        resume_ans.rwei_a           = ['50','60','70','80','90','100']
        resume_ans.rpoli_a          = Faker::Lorem.words.first
        resume_ans.riden_a          = "44***************"
        resume_ans.rpho_a           = [119,110,120]
        resume_ans.rmail_a          = ['mail','no']
        resume_ans.raddr_a          = Faker::Lorem.words.first
        resume_ans.rprof_a          = Faker::Lorem.words.first
        resume_ans.reva_a           = Faker::Lorem.sentence
      end
  end
end


