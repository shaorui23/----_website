class PersonsController < ApplicationController
  before_filter :login_required
  #Persons controller 主要是用来针对个人资料／简历的操作的
  #显示个人资料主页
  def index
    @resume = Resume.first
    @resume_ans = current_user.resume_ans
  end

  def create
    unless current_user.resume_ans.nil?
      update params[:resume_ans] 
    else
      params[:resume_ans][:user_id] = current_user.id
      params[:resume_ans][:rmail_a] = current_user.email
      @resume_ans =  ResumeAns.new(params[:resume_ans]) 
      @resume_ans.save!
      flash[:error] = "个人资料保存成功"
      redirect_to :action => "index"
    end
  rescue ActiveRecord::RecordInvalid => e
    flash[:error] = e.message
    redirect_to :action => "index"
  end

  def update resume_ans
    current_user.resume_ans.update_attributes(resume_ans)
    flash[:error] = "个人资料更新成功"
    redirect_to :action => "index"
  end

end
