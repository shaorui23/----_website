class ManageController < ApplicationController
    layout "applicaton", :except => [:index]
    def index
    end

#GET /manage/edit_resume.json
    def edit_resume
      @resumes = Resume.all
      render_json @resumes
    end

    def update_resume
      @resumes = Resume.first
      debugger
      if @resumes.update_attributes(params[:resume][0])
        render_json "success"
      else
        render_error "无法保存"
      end
    end
end
