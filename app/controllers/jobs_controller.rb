class JobsController < ApplicationController

#GET /jobs
  def index
    
     @search = Job.search(params[:search])
     @job = Job.first
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

#    @jobs = Job.all.collect { |j| j.attributes.merge "position_type" => j.jobtype.job_type }
    records = Job.all(default_params)
    @jobs    = []
    records.each do |job|
      data = job.attributes.merge(:position_type => job.jobtype.job_type)
      @jobs.push(data)
    end

    #@jobs = Job.all(default_params)
    @count = Job.all(:conditions=>params[:conditions]).count
  #  @jobs = @jobs.collect { |r| r.provide(params[:fields]) }
      respond_to do |format|
        format.html  
        format.json  { render_json @jobs, @count}
      end
  end

#GET /jobs/search_job_number.json             liwen修改:加载tree
  def search_job_number
    children_of_job = []
    state = ["招聘ing","未发布","已招满","已截止","已删除"]
    state.each do |job_state|
      number = Job.all(:conditions=>["state = ?",job_state]).count
      children_of_job << { "text" => job_state +"\("+number.to_s+"\)","leaf"=>true,"id"=>job_state }
    end
      number = Job.all.count
      children_of_job << { "text" => "全部" +"\("+number.to_s+"\)","leaf"=>true,"id"=>"全部" }

    parent_node = [{ "text"=>"状态","children"=>children_of_job,"leaf"=>false,"expanded"=>true }]
    render  :json =>parent_node.to_json
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
    #render (:file => "/home/shao/webSite1/app/views/jobs/_get_job.html.erb")
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
