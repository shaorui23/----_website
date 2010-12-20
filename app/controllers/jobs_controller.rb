class JobsController < ApplicationController

#GET /jobs
  def index
    
     @search = Job.search(params[:search])
     @job = Job.first
     @jobs = @search.paginate(:page => params[:page], :per_page =>8)#.collect { |j| j.attributes.merge "position_typ" => j.jobtype.job_type  }
      respond_to do |format|
        format.html  
        format.json  { render_json @jobs }
      end
  end

#GET /jobs/all_jobs 区别于上边的get，有待修改
  def all_jobs

    default_params = { :offset => params[:offset], :limit => params[:limit],
      :include => :jobtype ,:conditions=>params[:conditions]}

    records = Job.all(default_params)
    @jobs    = []
    records.each do |job|
      data = job.attributes.merge(:position_type => job.jobtype.job_type)
      @jobs.push(data)
    end
    @count = Job.all(:conditions=>params[:conditions]).count
      respond_to do |format|
        format.html  
        format.json  { render_json @jobs, @count}
      end
  end

#GET /jobs/search_job_number.json             liwen修改:加载tree
  def search_job_number
    children_of_job = []
    state = Job.state_cn
    state.each do |k, v|
      number = Job.all(:conditions=>["state = ?",k]).count
      #children_of_job << { "text" => v +"\("+number.to_s+"\)","leaf"=>true,"id"=>k }
      children_of_job << { "text" => v ,"leaf"=>true,"id"=>k }
    end
      number = Job.all.count
      #children_of_job << { "text" => "全部职位" +"\("+number.to_s+"\)","leaf"=>true,"id"=>"全部" }
      children_of_job << { "text" => "全部职位" ,"leaf"=>true,"id"=>"全部" }

    parent_node = [{ "text"=>"状态","children"=>children_of_job,"leaf"=>false,"expanded"=>true }]
    render  :json =>parent_node.to_json
  end

#POST /jobs
  def create
    job = Job.new(params[:job])
    if job.save
      render_json 'success'
    else
      render_error "failure"
    end
  end

  def update
    job = Job.find(params[:id])
    if job.update_attributes(params[:job])
      render_json 'success' 
    else
      render_error '存在错误,或该状态不可修改！'
    end
    rescue => e
     render_error e.to_s
  end

#POST /jobs/:id/submit_answer
  def submit_answer
    @paperAnswer = GroupAn.new(params[:paperAnswer])
    if @paperAnswer.save
      #redirect_to_index("Thank you for your order") 
      #render :action => "jobs/index"
      flash[:notice] = "问卷填写成功！请等待结果！"
      redirect_back_or_default(:controller => '/jobs', :action => 'index')

    else
      render_error "failure"
    end
  end

#GET /jobs/:id/get_job
  def get_job
    @job = Job.find params[:id]
    #render_to (:file => "/home/shao/webSite1/app/views/jobs/_get_job.html.erb")
    respond_to do |format|
        format.html  { render 'jobs/get_job' }
        format.json  { render_json @job}
      end
   # render (:template => "jobs/get_job")
  end

  # POST /jobs/:id/push_job
  def push_job
    update_state('push_job')
  end

#GET /jobs/:id/show_group
  def show_group
    @job = Job.find params[:id]
    @group = Job.find(params[:id]).groups.find_by_active true
    @questions = @group.questions

    respond_to do |format|
        format.html  { render 'jobs/show_group' }
        format.json  { render_json @questions}
      end
  end

#DELETE
  def destroy
    @job = Job.find params[:id]
    if @job.destroy
      render_json 'success'    
    else
      render_error 'failure'
    end
  end

#POST /jobs/delete_all_
  def delete_all
    @ids =  params[:ids]
    if !@ids.blank?
      @ids.each do |id|
        Job.find(id).destroy if (Job.exists? id)
      end
      render_json "success"
    else
      render_error 'failure'
    end
  end

  private
   
   def update_state(action)
     job = Job.find(params[:id])
     if job.send(action)
       render_json 'success' 
     else
       render_error 'failure'
     end
   end


end
