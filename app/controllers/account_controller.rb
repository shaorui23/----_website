class AccountController < ApplicationController

  include AuthenticatedSystem
  before_filter :login_from_cookie

  def index
    redirect_to(:action => 'signup') unless logged_in? || User.count > 0
  end

  def login
    return unless request.post?
    self.current_user = User.authenticate(params[:login], params[:password])
    if logged_in?
      #是否记住密码，暂时不用,有cookie保存
      #if params[:remember_me] == "1"
      #  self.current_user.remember_me
      #  cookies[:auth_token] = { :value => self.current_user.remember_token , :expires => self.current_user.remember_token_expires_at }
      #end
      redirect_back_or_default(:controller => 'homes', :action => 'index')
      flash[:notice] = "#{ current_user.login },登录成功!"
    else
      flash[:notice] =  "登录失败,没有该帐号或帐号未验证" 
      redirect_back_or_default(:controller => "homes", :action => "index")
    end

  end

  #Comment: Mouse
  #现在总共有两个显示flash的地方，一个是在 account/index 另一个是在 home/index
  #account/index => { 注册成功提示、用户成功退出提示 }
  #home/index => { 异常的提示、登录失败、登录成功、没有登录的退出 }
  #TODO 汇总所有提示于一起

  def signup
    @user = User.new(params[:user])
    return unless request.post?
    @user.save!
    #self.current_user = @user
    flash[:notice] = "注册信息已经发送到您的邮箱中,请确认后返回主页登录!"
    #redirect_back_or_default(:controller => '/account', :action => 'index')
    redirect_to :action => "index"
  rescue ActiveRecord::RecordInvalid => e
    flash[:error] = e.message 
    redirect_to :action => "signup" 
  end
  
  def logout
    self.current_user.forget_me if logged_in?
    cookies.delete :auth_token
    reset_session
    if logged_in?
      flash[:notice] = "#{ current_user.login }，您已经退出"
      redirect_back_or_default(:controller => '/account', :action => 'index')
    else
      flash[:notice] = "您好，您还没有登录"
      redirect_back_or_default(:controller => "homes", :action => "index")
    end
  end

  # !验证码确证
  def activate
    @user = User.find_by_activation_code(params[:id])
    if @user and @user.activate
      self.current_user = @user
      flash[:notice] = "验证成功！您现在可以登录了"
    end
      redirect_back_or_default(:controller => '/homes', :action => "index")
  end


end
