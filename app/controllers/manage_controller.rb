class ManageController < ApplicationController
  
    #第一验证
    before_filter :login_required
    layout "applicaton", :except => [:index]

    def index
      #第二验证
      if current_user.remember_token != "hr"
        flash[:notice] = "#{ current_user.login } 您好，您没有权限进行此项操作"
        redirect_to :controller => "/homes", :action => "index"  
      end
    end

#GET /manage/edit_resume.json
    def edit_resume
      @resumes = Resume.all
      render_json @resumes
    end

#GET /manage/:id/get_job.json
    def get_job
      @job = Job.find(params[:id])
      render_json @job
    end

    def update_resume
      @resumes = Resume.first
      if @resumes.update_attributes(params[:resume][0])
        render_json "success"
      else
        render_error "无法保存"
      end
    end

#POST /manage/create_resume.json
    def create_resume
      resumes = Resume.new(params[:resume])
      resumes.save
    end

#GET  /manage/resume_an.json
    def resume_an(options={ })
      steady_options = { :order => params[:order], :offset => params[:offset], :limit => params[:limit] }
      options        = steady_options.merge(options)
      count          = ResumeAns.count
      records        = ResumeAns.scoped(options)
      @resume_ans    = []
      records.all.each do |res_an|
        data = res_an.attributes.merge(:user_login => res_an.user.login)
        @resume_ans.push(data)
      end
      render_json @resume_ans,count
    end

#GET  /manage/find_resume.json?id
    def find_resume_an
      @resume_ans_n = ResumeAns.find(params[:id])
      render_json @resume_ans_n.to_a
    end

#GET  /manage/query.json?conditions
    def query
      @resume_ans=[]
      steady_options = { :order => params[:order], :offset => params[:offset], :limit => params[:limit],:include=>[:user],:conditions=>params[:conditions]}
      count = ResumeAns.all({ :conditions=>params[:conditions] }).count
      res_an = ResumeAns.all(steady_options)
      res_an.each do |res_an|
        data = res_an.attributes.merge(:user_login => res_an.user.login)
        @resume_ans.push(data)
      end
      render_json @resume_ans.to_a,count
    end
end
