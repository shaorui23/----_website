class HomesController < ApplicationController
  #首页显示
  def index
    #@jobs = Job.find(:all, :limit => 3)
    #@jobs = Job.all.slice(Job.all.length-3,Job.all.length+1)
    @jobs = Job.all_push_jobs
    flash[:jobs] = "目前暂无职位发布" if @jobs.blank?
  end

end
