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

  def update
    job = Job.find(params[:id])
    if job.update_attributes(params[:job])
      render_json 'success' 
    else
      render_error 'failure'
    end
    rescue => e
     render_error e.to_s
  end

#GET /jobs/:id/get_job
  def get_job
    @job = Job.find params[:id]
    render_json @job
  end

#DELETE
  def destroy
    @job = Job.find(params[:id])
    if @job.destroy
      render_json 'success'    
    else
      render_error 'failure'
    end
  end

end
