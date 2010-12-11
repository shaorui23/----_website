class UserNotifier < ActionMailer::Base

  def signup_notification(user)
    setup_email(user)
    @subject    += '请激活您的账户'
    @body[:url]  = "http://shaorui.heroku.com/account/activate/#{user.activation_code}"
  end
  
  def activation(user)
    setup_email(user)
    @subject    += '您的账户已经激活！您可以访问我们的网站了'
    @body[:url]  = "http://shaorui.heroku.com/"
  end
  
  protected

  def setup_email(user)
    @recipients  = "#{user.email}"
    @from        = "WandoTeam"
    @subject     = "[Wando] "
    @sent_on     = Time.now
    @body[:user] = user
  end

end
