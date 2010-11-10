class ManageController < ApplicationController
    layout "applicaton", :except => [:index]
    def index
    end

#GET /manage/edit_resume.json
    def edit_resume
      @resumes = Resume.all
      render_json @resumes
    end

#PUT /manage/update_resume.json
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
    def resume_an
      @resume_ans = ResumeAns.all
      render_json @resume_ans
    end

#GET  /manage/find_resume.json?id
    def find_resume_an
      @resume_ans_n = ResumeAns.find(params[:id])
      render_json @resume_ans_n.to_a
    end
end
