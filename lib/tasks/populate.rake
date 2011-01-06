# lib/tasks/populate.rake
namespace :db do
  desc "创建虚拟数据，并迁移到数据库"
  task :populate => :environment do
    require 'populator'
    require 'faker'
    require 'randexp'
    
    
    [Job, ResumeAns,Jobtype,Question].each(&:delete_all)
    
    Jobtype.populate 5 do |job_type|
        job_type.job_type      =  ["管理","员工","经理","文秘","警察","法官"]
    end

    Job.populate 10 do |job|
      job.jname            =   ["后勤人员","普通员工","业务经理","文秘","保安","营销助理","清洁工","前台服务员","打字员"] 
      job.jdesc            =   Faker::Lorem.sentence 
      job.created_date     =   1.years.ago 
      job.closed_date      =   1.month.from_now
      job.jobtype_id       =   [1,2,3]
      job.salary           =   [1000,2000,3000,6000]
      job.education        =   ['本科','大专','高中']
      job.experience       =   ['两年','无要求','培训上岗','五年以上']
      job.job_number       =   [1,5,10,11,4,3]
      job.requirement      =   Faker::Lorem.sentence 
      job.state            =   ["unpush","ing","full"]
    end
     
    questions = ["最能概括自己的三个词","最喜欢和最不喜欢哪些大学课程","如果录用你，你将怎样开展工作","你在以前实习的公司从事什么样的工作","请你谈谈对我单位的看法","你为什么希望到我们公司工作"]

    
    index = 0

    Question.populate 6 do |q|
      q.qcon = questions[index]
      index += 1
    end

      ResumeAns.populate 10 do |resume_ans|
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
        resume_ans.riden_a          = "43***************"
        resume_ans.rpho_a           = [119,110,120]
        resume_ans.rmail_a          = ['mail','no']
        resume_ans.raddr_a          = Faker::Lorem.words.first
        resume_ans.rprof_a          = Faker::Lorem.words.first
        resume_ans.reva_a           = Faker::Lorem.sentence
      end
  end
end


