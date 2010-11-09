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
      redirect_back_or_default(:controller => '/homes', :action => 'index')
      flash[:notice] = "Logged in successfully"
      render(:text => false[:notice])
    else
      redirect_back_or_default(:controller => '/account', :account => 'login_error')
    end

  end

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
    flash[:notice] = "You have been logged out."
    redirect_back_or_default(:controller => '/account', :action => 'index')
  end

  # !验证码确证
  def activate
    @user = User.find_by_activation_code(params[:id])
    if @user and @user.activate
      self.current_user = @user
      flash[:notice] = "Your account has been activated"
    end
      redirect_back_or_default(:controller => '/homes', :action => "index")
  end


end
