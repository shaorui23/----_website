class UserObserver < ActiveRecord::Observer
  def after_create(user)
    #remember_token 不为空时候为hr或者管理，不需要发送邮件验证 
    UserNotifier.deliver_signup_notification(user) if user.remember_token.nil?
  end

  def after_save(user)
    UserNotifier.deliver_activation(user) if user.recently_activated?
  end
end
