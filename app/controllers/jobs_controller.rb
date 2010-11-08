class JobsController < ApplicationController

#GET /jobs
  def index
     @job = Job.all
      respond_to do |format|
        format.html  
        format.json  { render_json @job }
    end
  end

#POST /jobs
  def create
    job = Job.new(params[:job])
    if job.save
      render_json 'sucess'
    else
      render_error "failure"
    end
  end

end
