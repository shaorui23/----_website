class JobsController < ApplicationController

#GET /jobs
  def index
    
     @search = Job.search(params[:search])
     @jobs = @search.paginate(:page => params[:page], :per_page =>5)#.collect { |j| j.attributes.merge "position_typ" => j.jobtype.job_type  }
      respond_to do |format|
        format.html  
        format.json  { render_json @jobs }
      end
  end

#GET /jobs/all_jobs 区别于上边的get，有待修改
  def all_jobs

    default_params = { :offset => params[:offset], :limit => params[:limit],
      :include => :jobtype ,:conditions=>params[:conditions]}

    @jobs = Job.all.collect { |j| j.attributes.merge "position_type" => j.jobtype.job_type }
    #@jobs = Job.all(default_params)
    @count = Job.count
  #  @jobs = @jobs.collect { |r| r.provide(params[:fields]) }
      respond_to do |format|
        format.html  
        format.json  { render_json @jobs, @count}
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
