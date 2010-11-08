# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  helper :all # include all helpers, all the time
  protect_from_forgery # See ActionController::RequestForgeryProtection for details

  private

  def render_json(result = nil , count = 0)
    render :json => "(#{{ :success => true, :content => result, :total => count }.to_json})"
  end

  
    def render_error error_msg = ""
      logger.info "============  渲染错误 : #{error_msg.inspect} ============"
      respond_to do |format|
        format.html { render :text => error_msg.inspect , :layout => !request.xhr? , :status => 400 }
        format.js   { render :js   => "throw '#{error_msg}';" , :status => 400 }
        format.json do
          is_active_record = error_msg.is_a? ActiveRecord::Base
          content = {
            :active_record_error => is_active_record,
            :error_messages      => is_active_record ? error_msg.errors.full_messages.uniq : error_msg
          }
          render :json => "(#{{ :success => false, :content => content }.to_json})", :status => 400
        end
      end
    end

  # Scrub sensitive parameters from your log
  # filter_parameter_logging :password
end
