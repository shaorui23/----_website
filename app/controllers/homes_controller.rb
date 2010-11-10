class HomesController < ApplicationController
  #首页显示
  def index
    @jobs = Job.first_five_records
    flash[:jobs] = "目前暂无职位发布" if @jobs.blank?
  end

end
